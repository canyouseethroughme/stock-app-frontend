import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, InputNumber, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PanelItemProps {
  name: string;
  measurementUnit?: string;
  quantity: number;
  getValue?: (value: number) => void;
  initialValue?: number;
  enableEdit?: boolean;
  moreThanInitial?: boolean;
}

const { Title, Paragraph } = Typography;

export const PanelItem: React.FC<PanelItemProps> = ({
  name,
  measurementUnit,
  quantity,
  getValue,
  initialValue,
  enableEdit = false,
  moreThanInitial = false
}) => {
  const [value, setValue] = useState<number>(initialValue ?? 0);
  const location = useLocation();

  useEffect(() => {
    setValue(initialValue || 0);
  }, [initialValue]);

  const minusOne = () => {
    setValue(value - 1);
    getValue && getValue(value - 1);
  };

  const plusOne = () => {
    setValue(value + 1);
    getValue && getValue(value + 1);
  };
  return (
    <>
      <div
        className='flex-row'
        style={{
          paddingTop: '.5rem',
          justifyContent: 'space-between'
        }}
      >
        <div className='flex-column'>
          <Title level={4}>{name}</Title>
          <Paragraph style={{ color: 'grey' }}>{measurementUnit}</Paragraph>
        </div>
        {enableEdit ? (
          <div className='flex-column'>
            <div className='flex-row'>
              <Button
                type='text'
                size='large'
                disabled={value === 0}
                onClick={minusOne}
              >
                <MinusOutlined style={{ fontSize: '1.2rem' }} />
              </Button>

              <InputNumber
                value={value}
                max={12}
                min={0}
                style={{
                  width: '3rem',
                  fontSize: '1.2rem',
                  caretColor: 'transparent'
                }}
                onKeyDown={e => e.preventDefault()}
              />
              {/* TODO: FIX DISABLED TO NOT WORK WITH MORE THAN THE ONES EXISTING IN STOCK */}
              <Button
                type='text'
                size='large'
                disabled={!moreThanInitial && value === initialValue}
                onClick={plusOne}
              >
                <PlusOutlined style={{ fontSize: '1.2rem' }} />
              </Button>
            </div>
            <Paragraph style={{ color: 'grey', textAlign: 'center' }}>
              {quantity - value} left
            </Paragraph>
          </div>
        ) : (
          <Title level={4} style={{ marginRight: '2rem' }}>
            {initialValue}
          </Title>
        )}
        {/* {(location.pathname === '/confirming-order' ||
          location.pathname.includes('/confirming-order')) && (
          <Title level={4} style={{ marginRight: '2rem' }}>
            {initialValue}
          </Title>
        )} */}
      </div>
      <Divider style={{ margin: '0' }} />
    </>
  );
};
