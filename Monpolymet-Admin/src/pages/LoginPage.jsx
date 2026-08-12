import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Badge,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Lock, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { t } from '../i18n';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname ?? '/';

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : t.common.requiredField),
      password: (v) => (v ? null : t.common.requiredField),
    },
  });

  if (isAuthenticated) return <Navigate to={from} replace />;

  const submit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = String(err.message ?? '').toLowerCase();
      setError(msg.includes('invalid') ? 'И-мэйл эсвэл нууц үг буруу байна' : 'Системд нэвтрэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        backgroundColor: '#030712',
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(2, 132, 199, 0.22) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(14, 165, 233, 0.18) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.95) 0px, transparent 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background Decorative Mesh & Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(2,132,199,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* Subtle Grid Lines Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      <Paper
        radius="28px"
        p={{ base: 'xl', sm: '36px' }}
        w={440}
        maw="94vw"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(2, 132, 199, 0.12)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Stack gap="xl">
          {/* Header & Monpolymet Branding */}
          <Stack gap="xs" align="center" style={{ textAlign: 'center' }}>
            <Group gap="xs" style={{ marginBottom: '4px' }}>
              <Badge
                variant="gradient"
                gradient={{ from: 'sky', to: 'blue', deg: 135 }}
                size="md"
                radius="xl"
                leftSection={<Sparkles size={12} />}
                style={{ padding: '6px 14px', letterSpacing: '0.5px', fontWeight: 700 }}
              >
                МӨНПОЛИМЕТ ГРУПП
              </Badge>
            </Group>

            <Title
              order={2}
              style={{
                color: '#ffffff',
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                marginTop: '4px'
              }}
            >
              Удирдлагын Систем
            </Title>
          </Stack>

          {/* Form */}
          <form onSubmit={form.onSubmit(submit)}>
            <Stack gap="lg">
              <div>
                <Text style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  И-мэйл хаяг
                </Text>
                <TextInput
                  placeholder="admin@monpolymet.mn"
                  leftSection={<Mail size={18} color="#0284c7" />}
                  size="md"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(30, 41, 59, 0.6)',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      borderRadius: '14px',
                      fontSize: '14px',
                      height: '48px',
                      transition: 'all 0.2s ease',
                      '&:focus': {
                        borderColor: '#0284c7',
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        boxShadow: '0 0 0 3px rgba(2, 132, 199, 0.2)'
                      }
                    }
                  }}
                  {...form.getInputProps('email')}
                />
              </div>

              <div>
                <Text style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  Нууц үг
                </Text>
                <PasswordInput
                  placeholder="••••••••"
                  leftSection={<Lock size={18} color="#0284c7" />}
                  size="md"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(30, 41, 59, 0.6)',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      borderRadius: '14px',
                      fontSize: '14px',
                      height: '48px',
                      transition: 'all 0.2s ease',
                      '&:focus': {
                        borderColor: '#0284c7',
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        boxShadow: '0 0 0 3px rgba(2, 132, 199, 0.2)'
                      }
                    },
                    innerInput: {
                      color: '#ffffff'
                    }
                  }}
                  {...form.getInputProps('password')}
                />
              </div>

              {error && (
                <Text style={{ color: '#f87171', fontSize: '13px', textAlign: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  {error}
                </Text>
              )}

              <Button
                type="submit"
                fullWidth
                size="md"
                loading={loading}
                rightSection={!loading && <ArrowRight size={18} />}
                style={{
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.4)',
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.3px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
}
