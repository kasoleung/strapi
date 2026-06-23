import { GuidedTourContext } from './Context';

interface GuidedTourProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const GuidedTourProvider = ({ children, enabled = true }: GuidedTourProviderProps) => {
  const isGuidedTourEnabled = process.env.NODE_ENV !== 'test' && enabled;

  return <GuidedTourContext enabled={isGuidedTourEnabled}>{children}</GuidedTourContext>;
};
