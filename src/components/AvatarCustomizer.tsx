import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { calculateProgress } from '../../utils/helpers';
import { AvatarItem } from '../../types';

const AvatarCustomizer: React.FC = () => {
  const { user, unlockAvatarItem, equipAvatarItem } = useAppContext();
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const itemTypes = ['all', 'hair', 'face', 'body', 'accessory', 'background'];
  
  const filteredItems = user.avatar.items.filter(
    (item) => selectedType === 'all' || item.type === selectedType
  );
  
  // Get the currently equipped items
  const equippedItems = user.avatar.items.filter((item) => item.equipped);
  
  // Calculate XP progress
  const nextLevelXp = Math.floor(100 * Math.pow(1.5, user.level - 1));
  const progress = calculateProgress(user.xp, nextLevelXp);

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ margin: 0, color: '#333' }}>Avatar Customization</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Level {user.level}</span>
            <div
              style={{
                height: '12px',
                width: '100px',
                backgroundColor: '#eee',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#6200ea',
                }}
              />
            </div>
            <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>
              {user.xp}/{nextLevelXp} XP
            </span>
          </div>
          <div style={{ marginTop: '4px', fontSize: '14px', color: '#666' }}>
            💰 {user.coins} coins
          </div>
        </div>
      </div>

      {/* Avatar Preview */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {equippedItems
            .filter((item) => item.type === 'background')
            .map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `url(${item.imageUrl}) center/cover`,
                }}
              />
            ))}
            
          {equippedItems
            .filter((item) => item.type === 'body')
            .map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  background: `url(${item.imageUrl}) center/contain no-repeat`,
                }}
              />
            ))}
            
          {equippedItems
            .filter((item) => item.type === 'face')
            .map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  width: '80px',
                  height: '80px',
                  background: `url(${item.imageUrl}) center/contain no-repeat`,
                }}
              />
            ))}
            
          {equippedItems
            .filter((item) => item.type === 'hair')
            .map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  top: '-15px',
                  background: `url(${item.imageUrl}) center/contain no-repeat`,
                }}
              />
            ))}
            
          {equippedItems
            .filter((item) => item.type === 'accessory')
            .map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  background: `url(${item.imageUrl}) center/contain no-repeat`,
                }}
              />
            ))}
            
          {equippedItems.length === 0 && (
            <div style={{ color: '#888', textAlign: 'center' }}>
              No items equipped
            </div>
          )}
        </div>
        
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#6200ea',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '12px',
          }}
        >
          Avatar Level {user.avatar.level}
        </div>
      </div>

      {/* Item Type Filters */}
      <div
        style={{
          display: 'flex',
          marginBottom: '16px',
          borderBottom: '1px solid #eee',
          paddingBottom: '12px',
          overflowX: 'auto',
        }}
      >
        {itemTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              backgroundColor: selectedType === type ? '#6200ea' : 'transparent',
              color: selectedType === type ? 'white' : '#666',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px',
              fontWeight: 'bold',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredItems.map((item) => (
          <AvatarItemCard
            key={item.id}
            item={item}
            userLevel={user.level}
            coins={user.coins}
            onUnlock={() => unlockAvatarItem(item.id)}
            onEquip={() => equipAvatarItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface AvatarItemCardProps {
  item: AvatarItem;
  userLevel: number;
  coins: number;
  onUnlock: () => void;
  onEquip: () => void;
}

const AvatarItemCard: React.FC<AvatarItemCardProps> = ({
  item,
  userLevel,
  coins,
  onUnlock,
  onEquip,
}) => {
  const unlockCost = item.unlockLevel * 50;
  const canUnlock = userLevel >= item.unlockLevel && coins >= unlockCost;
  
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: item.unlocked || (userLevel >= item.unlockLevel) ? 1 : 0.6,
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {item.unlocked ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `url(${item.imageUrl}) center/contain no-repeat`,
            }}
          />
        ) : (
          <span style={{ color: '#888', fontSize: '24px' }}>🔒</span>
        )}
      </div>
      
      <h4 style={{ margin: '0 0 4px 0', textAlign: 'center' }}>{item.name}</h4>
      
      <div
        style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '12px',
          textTransform: 'capitalize',
        }}
      >
        {item.type}
      </div>
      
      {!item.unlocked && (
        <div
          style={{
            fontSize: '12px',
            color: userLevel >= item.unlockLevel ? '#333' : '#f44336',
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          {userLevel >= item.unlockLevel
            ? `Unlock for ${unlockCost} coins`
            : `Unlocks at level ${item.unlockLevel}`}
        </div>
      )}
      
      {item.unlocked ? (
        <button
          onClick={onEquip}
          disabled={item.equipped}
          style={{
            backgroundColor: item.equipped ? '#4caf50' : '#6200ea',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: item.equipped ? 'default' : 'pointer',
            width: '100%',
            fontSize: '14px',
            opacity: item.equipped ? 0.8 : 1,
          }}
        >
          {item.equipped ? 'Equipped' : 'Equip'}
        </button>
      ) : (
        <button
          onClick={onUnlock}
          disabled={!canUnlock}
          style={{
            backgroundColor: canUnlock ? '#6200ea' : '#ddd',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: canUnlock ? 'pointer' : 'not-allowed',
            width: '100%',
            fontSize: '14px',
          }}
        >
          Unlock
        </button>
      )}
    </div>
  );
};

export default AvatarCustomizer; 