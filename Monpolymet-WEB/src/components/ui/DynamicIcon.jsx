import * as Icons from 'lucide-react';

/**
 * Dynamically renders a Lucide icon from its string name.
 * e.g., <DynamicIcon name="ShieldAlert" size={24} />
 */
export default function DynamicIcon({ name, ...props }) {
  if (!name) return <Icons.Circle {...props} />; // fallback
  
  // Try exact match first
  if (Icons[name]) {
    const IconComponent = Icons[name];
    return <IconComponent {...props} />;
  }
  
  // Try case-insensitive matching
  const iconKey = Object.keys(Icons).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );
  
  if (iconKey && Icons[iconKey]) {
    const IconComponent = Icons[iconKey];
    return <IconComponent {...props} />;
  }

  // Final fallback
  return <Icons.Circle {...props} />;
}
