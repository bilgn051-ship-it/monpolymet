import { useEffect, useState } from 'react';
import { Button, Card, Center, Group, Loader, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { api } from '../../api/client';
import PageHeader from '../PageHeader';
import { FormField } from './ResourceFields';
import {
  blankObject,
  cleanPayload,
  firstMissingRequired,
  valuesFromItem,
} from './resourceUtils';
import { t } from '../../i18n';

/**
 * Generic editor for a singleton (one document per page). Loads via GET
 * (which may be null before the first save) and upserts via PUT.
 */
export default function SingletonPage({ config }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const form = useForm({ initialValues: blankObject(config.fields) });

  useEffect(() => {
    let active = true;
    api
      .get(config.path)
      .then((doc) => {
        if (!active) return;
        form.setValues(
          doc ? valuesFromItem(config.fields, doc) : blankObject(config.fields),
        );
      })
      .catch((err) =>
        notifications.show({ color: 'red', title: t.toast.loadError, message: err.message }),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.path]);

  const submit = async (values) => {
    const missing = firstMissingRequired(config.fields, values);
    if (missing) {
      notifications.show({ color: 'red', message: `${missing} — ${t.common.requiredField}` });
      return;
    }
    setSaving(true);
    try {
      await api.put(config.path, cleanPayload(config.fields, values));
      notifications.show({ color: 'green', message: t.toast.updated });
    } catch (err) {
      notifications.show({ color: 'red', title: t.toast.saveError, message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Center py={80}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <PageHeader title={config.title} subtitle={config.subtitle} />
      <Card withBorder radius="md" padding="lg" maw={880}>
        <form onSubmit={form.onSubmit(submit)}>
          <Stack gap="md">
            {config.fields.map((field) => (
              <FormField key={field.name} form={form} field={field} path={field.name} />
            ))}
            <Group justify="flex-end" mt="sm">
              <Button type="submit" loading={saving}>
                {t.common.save}
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </>
  );
}
