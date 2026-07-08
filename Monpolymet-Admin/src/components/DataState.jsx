import { Alert, Button, Center, Loader, Stack, Text } from '@mantine/core';
import { AlertTriangle, Inbox } from 'lucide-react';
import { t } from '../i18n';

/**
 * Uniform loading / error / empty handling for list screens.
 * Renders `children` only once data is present.
 */
export default function DataState({ loading, error, empty, onRetry, children }) {
  if (loading) {
    return (
      <Center py={64}>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        color="red"
        variant="light"
        icon={<AlertTriangle size={18} />}
        title={t.common.errorTitle}
      >
        <Stack gap="sm" align="flex-start">
          <Text size="sm">{error}</Text>
          {onRetry && (
            <Button size="xs" variant="light" color="red" onClick={onRetry}>
              {t.common.retry}
            </Button>
          )}
        </Stack>
      </Alert>
    );
  }

  if (empty) {
    return (
      <Center py={64}>
        <Stack align="center" gap={6}>
          <Inbox size={44} strokeWidth={1.4} opacity={0.35} />
          <Text fw={600}>{t.common.emptyTitle}</Text>
          <Text c="dimmed" size="sm" ta="center" maw={360}>
            {t.common.emptyBody}
          </Text>
        </Stack>
      </Center>
    );
  }

  return children;
}
