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
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { LockKeyhole } from 'lucide-react';
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
      setError(msg.includes('invalid') ? t.login.invalid : t.login.error);
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
        padding: 16,
        background: 'linear-gradient(135deg, #0a1a30 0%, #123a72 100%)',
      }}
    >
      <Paper radius="lg" p="xl" shadow="xl" w={420} maw="94vw">
        <Stack gap="lg">
          <Center>
            <ThemeIcon size={56} radius="md" variant="filled" color="brand">
              <LockKeyhole size={26} />
            </ThemeIcon>
          </Center>
          <div style={{ textAlign: 'center' }}>
            <Title order={3}>{t.login.title}</Title>
            <Text c="dimmed" size="sm" mt={4}>
              {t.login.subtitle}
            </Text>
          </div>

          <form onSubmit={form.onSubmit(submit)}>
            <Stack gap="md">
              <TextInput
                label={t.login.email}
                placeholder="admin@monpolymet.mn"
                withAsterisk
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label={t.login.password}
                placeholder="••••••••"
                withAsterisk
                {...form.getInputProps('password')}
              />
              {error && (
                <Text c="red" size="sm" ta="center">
                  {error}
                </Text>
              )}
              <Button type="submit" fullWidth size="md" loading={loading}>
                {loading ? t.login.signingIn : t.login.submit}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
}
