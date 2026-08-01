import { useState } from 'react';
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
import { Upload, Link as LinkIcon, Trash2, CheckCircle2, FileImage, Sparkles } from 'lucide-react';
import { api } from '../api/client';
import { notifications } from '@mantine/notifications';

export default function ImageUploader({ value, onChange, label = 'Зураг оруулах', required = false }) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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
          message: 'Зураг амжилттай хуулагдлаа',
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
            <Group gap="sm" wrap="nowrap">
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
                  justifyContent: 'center'
                }}
              >
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fit="cover"
                  h={64}
                  w={64}
                  fallbackSrc="https://placehold.co/100x100?text=No+Image"
                />
              </Box>

              <div>
                <Group gap="xs" mb={2}>
                  <Badge size="xs" color="green" variant="light" leftSection={<CheckCircle2 size={10} />}>
                    Идэвхтэй зураг
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all', maxWidth: 280 }} lineClamp={1}>
                  {value}
                </Text>
              </div>
            </Group>

            <Tooltip label="Зургийг цэвэрлэх">
              <ActionIcon color="red" variant="subtle" onClick={() => onChange('')}>
                <Trash2 size={16} />
              </ActionIcon>
            </Tooltip>
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
          onClick={() => document.getElementById('image-uploader-file-input')?.click()}
        >
          <input
            id="image-uploader-file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          />

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
