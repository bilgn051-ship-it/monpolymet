import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  SegmentedControl,
  ActionIcon,
  Tooltip,
  Badge
} from '@mantine/core';
import { Upload, Link as LinkIcon, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';
import { api } from '../api/client';
import { notifications } from '@mantine/notifications';

export default function ImageUploader({ value, onChange, label = 'Зураг оруулах', required = false }) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Unique ID per instance so multiple ImageUploaders on the same page don't conflict
  const fileInputId = useRef(`image-uploader-file-input-${Math.random().toString(36).substring(2, 9)}`).current;

  // Resolve preview URL so port 5174 admin correctly resolves /uploads/... from port 4000 backend
  const getPreviewUrl = (val) => {
    if (!val) return '';
    if (typeof val === 'string' && val.startsWith('/uploads/')) {
      const defaultHost = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
      return `http://${defaultHost}:4000${val}`;
    }
    return val;
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      notifications.show({
        color: 'red',
        title: 'Алдаа',
        message: 'Зөвхөн зураг файл оруулах боломжтой (.jpg, .png, .webp, .svg)',
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.upload('/uploads', formData);

      if (res && res.url) {
        onChange(res.url);
        notifications.show({
          color: 'green',
          title: 'Амжилттай',
          message: 'Зураг амжилттай хуулагдлаа. "Хадгалах" товчийг дараарай.',
        });
      } else if (res && res.filename) {
        onChange(`/uploads/${res.filename}`);
        notifications.show({
          color: 'green',
          title: 'Амжилттай',
          message: 'Зураг амжилттай хуулагдлаа. "Хадгалах" товчийг дараарай.',
        });
      }
    } catch (err) {
      notifications.show({
        color: 'red',
        title: 'Upload алдаа',
        message: err.message || 'Зураг хуулахад алдаа гарлаа',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <Box mb="sm">
      {/* Hidden File Input for this specific instance */}
      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileChange(e.target.files[0]);
            e.target.value = ''; // Reset input so same file can be re-selected
          }
        }}
      />

      <Group justify="space-between" align="center" mb={6}>
        <Text size="xs" fw={700} c="#475569" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </Text>

        <SegmentedControl
          value={mode}
          onChange={setMode}
          data={[
            { label: 'Файл хуулах (Drag & Drop)', value: 'upload' },
            { label: 'Зургийн URL', value: 'url' }
          ]}
          size="xs"
          radius="sm"
          color="blue"
        />
      </Group>

      {/* 🖼️ IMAGE PREVIEW IF VALUE EXISTS */}
      {value ? (
        <Paper p="xs" radius="md" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', position: 'relative' }}>
          <Group align="center" justify="space-between" wrap="nowrap">
            <Group gap="sm" wrap="nowrap" style={{ overflow: 'hidden' }}>
              <Box
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Image
                  src={getPreviewUrl(value)}
                  alt="Uploaded preview"
                  fit="cover"
                  h={64}
                  w={64}
                  fallbackSrc="https://placehold.co/100x100?text=Uploaded"
                />
              </Box>

              <div style={{ overflow: 'hidden' }}>
                <Group gap="xs" mb={2}>
                  <Badge size="xs" color="green" variant="light" leftSection={<CheckCircle2 size={10} />}>
                    Идэвхтэй зураг
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }} lineClamp={1}>
                  {value}
                </Text>
              </div>
            </Group>

            <Group gap="xs" wrap="nowrap">
              <Button
                size="xs"
                variant="light"
                color="blue"
                leftSection={<RefreshCw size={14} />}
                loading={uploading}
                onClick={() => document.getElementById(fileInputId)?.click()}
              >
                Солих
              </Button>

              <Tooltip label="Зургийг устгах / Цэвэрлэх">
                <ActionIcon
                  color="red"
                  variant="filled"
                  size="md"
                  onClick={() => onChange('')}
                >
                  <Trash2 size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Paper>
      ) : mode === 'upload' ? (
        /* 📤 DRAG & DROP UPLOAD ZONE */
        <Paper
          p="xl"
          radius="md"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: dragOver ? '2px dashed #001CE8' : '2px dashed #cbd5e1',
            backgroundColor: dragOver ? '#eff6ff' : '#f8fafc',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => document.getElementById(fileInputId)?.click()}
        >
          <Stack align="center" gap={6}>
            <Box
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Upload size={20} color="#001CE8" />
            </Box>

            <Text size="sm" fw={600} c="#0f172a">
              {uploading ? 'Зургийг хуулж байна…' : 'Зургаа энд чирж оруулна уу'}
            </Text>
            <Text size="xs" c="dimmed">
              эсвэл дарж компьютерээс сонгоно уу (PNG, JPG, WEBP, SVG)
            </Text>
          </Stack>
        </Paper>
      ) : (
        /* 🔗 DIRECT URL INPUT */
        <TextInput
          placeholder="https://images.unsplash.com/..."
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          leftSection={<LinkIcon size={16} />}
        />
      )}
    </Box>
  );
}
