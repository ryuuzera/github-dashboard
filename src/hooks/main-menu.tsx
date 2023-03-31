import Dashboard from '@/layouts/dashboard';
import { createContext, useContext, useState } from 'react';

type ContentType = React.ReactNode;

interface ContentContextType {
  content: ContentType;
  setContent: (content: ContentType) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<any>({
    content: <Dashboard />
  });

  const setContent = (content: any) => {
    setState({ content });
  };

  return (
    <ContentContext.Provider value={{ setContent, content: state.content }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
