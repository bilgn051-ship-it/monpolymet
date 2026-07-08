import { Group, Text, Title } from '@mantine/core';

export default function PageHeader({ title, subtitle, action, hideTitle = false, filterArea }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--mantine-color-default-border)',
      paddingBottom: '16px',
      marginBottom: '20px'
    }}>
      <Group justify="space-between" align="center">
        {/* Left Side: Title/Subtitle or Filter Area */}
        {hideTitle ? (
          filterArea || <div />
        ) : (
          <div>
            {title && (
              <Title order={2} fw={700}>
                {title}
              </Title>
            )}
            {subtitle && (
              <Text c="dimmed" size="sm" mt={4}>
                {subtitle}
              </Text>
            )}
          </div>
        )}

        {/* Right Side: Add Button or Actions */}
        {action}
      </Group>
    </div>
  );
}
