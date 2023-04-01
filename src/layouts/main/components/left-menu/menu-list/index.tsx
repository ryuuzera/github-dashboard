import Colors from '@/assets/theming/colors';
import { ContentProvider, useContent } from '@/hooks/main-menu';
import { Github } from 'lucide-react';
import { ReactNode, useState } from 'react';
import styles from './styles';
import Dashboard from '@/layouts/dashboard';

interface MenuItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
}

interface MenuState {
  activeId: string;
}

interface MenuProps {
  items: MenuItemProps[];
}

const Menu = ({ items }: MenuProps) => {
  const [state, setState] = useState<MenuState>({
    activeId: items[0].id,
  });

  const handleClick = (item: MenuItemProps) => {
    setState({ activeId: item.id });
    item.onClick(item.id);
  };

  const styleProps = () => {
    return {
      props: {
        Colors,
      },
    };
  };
  const css = styles(styleProps());
  return (
    <>
      <ul className='list'>
        {items.map((item) => (
          <li
            className='item'
            key={item.id}
            id={item.id}
            onClick={() => handleClick(item)}
            style={{
              background: state.activeId === item.id ? Colors.background[200] : Colors.background[100],
            }}>
            <div className='icon'>{item.icon}</div>
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          ${css}
        `}
      </style>
    </>
  );
};

const MenuList = () => {
  const { setContent } = useContent();

  const handleClick = (id: string, content: ReactNode) => {
    setContent(content);
  };

  const items: MenuItemProps[] = [
    {
      id: 'dashboard',
      label: 'dashboard',
      onClick: () => handleClick('dashboard', (<Dashboard />)),
      icon: <Github color={Colors.font.main} />,
    },
    {
      id: 'teste',
      label: 'teste',
      onClick: () => handleClick('teste', <>Hello teste</>),
      icon: <Github color={Colors.font.main} />,
    },
  ];

  return (
    <ContentProvider>
      <Menu items={items} />
    </ContentProvider>
  );
};

export default MenuList;
