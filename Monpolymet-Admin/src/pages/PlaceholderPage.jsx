import { Badge, Card, Center, Stack, Text, ThemeIcon } from '@mantine/core';
import { Hammer } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { t } from '../i18n';

/**
 * Styled stand-in for content screens not yet built out. Shown inside the
 * full admin shell so navigation stays consistent while the remaining
 * collections are implemented.
 */
export default function PlaceholderPage({ title, collection }) {
  return (
    <>
      <PageHeader title={title} />
      <Card withBorder radius="md" padding="xl">
        <Center py={40}>
          <Stack align="center" gap="sm" maw={420}>
            <ThemeIcon size={56} radius="xl" variant="light" color="brand">
              <Hammer size={26} />
            </ThemeIcon>
            <Badge variant="light" size="lg">
              {t.placeholder.soon}
            </Badge>
            <Text c="dimmed" ta="center">
              {t.placeholder.body}
            </Text>
            {collection && (
              <Text size="xs" c="dimmed">
                {t.placeholder.collection}: <code>{collection}</code>
              </Text>
            )}
          </Stack>
        </Center>
      </Card>
    </>
  );
}
