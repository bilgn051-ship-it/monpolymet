import { t } from '../../i18n';

/** Review states in workflow order, shared by the list + dashboard. */
export const STATUS_ORDER = ['new', 'reviewed', 'shortlisted', 'rejected'];

export const STATUS_COLORS = {
  new: 'blue',
  reviewed: 'yellow',
  shortlisted: 'teal',
  rejected: 'red',
};

export const STATUS_OPTIONS = STATUS_ORDER.map((value) => ({
  value,
  label: t.applications.status[value],
}));
