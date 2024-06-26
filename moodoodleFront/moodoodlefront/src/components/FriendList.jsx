import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import FriendProfile from '../components/FriendProfile';
import FriendCalendar from '../components/FriendCalendar';
import Dropdown from './Dropdown';
import useDetectClose from '../hooks/useDetectClose';
import useFriendProfile from '../hooks/useFriendProfile';
import useFriendCalendar from '../hooks/useFriendCalendar';

export default function FriendList() {
  const { friendList, getFriendList, handleDeleteFriend, hasFriend, isDelete, setIsDelete } = useFriendProfile();
  const [isOpen, ref, toggleDropdown] = useDetectClose(false);
  const { showCalendar, setShowCalendar, handleShowCalendar } = useFriendCalendar();
  const [selectedUser, setSelectedUser] = useState('');
  const context = useOutletContext();

  useEffect(() => {
    getFriendList();
  }, []);

  const handleDelete = (to_user_id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      handleDeleteFriend(to_user_id);
    }
  };

  const handleCalendar = (to_user) => {
    setSelectedUser(to_user);
    setShowCalendar(true);
  };

  const handleShow = () => {
    setIsDelete((prev) => !prev);
  };

  return (
    <div className='flex flex-col items-center w-[342px] h-[619px] relative gap-[20px] rounded-[20px] bg-white shadow-componentShadow'>
      <div className='flex justify-between w-[300px] h-[40px]'>
        <div className='self-end cursor-pointer' onClick={toggleDropdown} ref={ref}>
          {isDelete ? (
            <button className='self-start' type='button' onClick={handleShow}>
              <img src='/assets/leftArrow.svg' alt='뒤로가기' className='w-[7px] h-[14px]' />
            </button>
          ) : null}
        </div>
        <p className='self-end font-bold text-center text-darkNavy w-full'>{isDelete ? '친구 삭제' : '친구 목록'}</p>
        <div className='self-end cursor-pointer' onClick={toggleDropdown} ref={ref}>
          <img src='/assets/moreline.svg' alt='more' />
          {isOpen && <Dropdown setIsDelete={setIsDelete} />}
        </div>
      </div>
      <div className='flex flex-col gap-[5px]'>
        {hasFriend ? (
          Array.from(friendList.values()).map((friend) => (
            <FriendProfile
              key={friend.id} // 고유한 key prop 추가
              nickname={friend.nickname}
              description={friend.description}
              img={friend.profile_image}
              {...(isDelete
                ? {
                    src2: '/assets/frienddelete.svg',
                    alt2: 'delete',
                    onClick2: () => handleDelete(friend.id),
                  }
                : friend.public
                  ? {
                      src2: '/assets/calendar.svg',
                      alt2: 'calendar',
                      onClick2: () => handleCalendar(friend),
                    }
                  : { src2: '/assets/nocalendar.svg', alt2: 'nocalendar' })}
            />
          ))
        ) : (
          <p className='text-sm font-semibold text-center text-darkgray'>친구 결과 없음</p>
        )}
        {showCalendar && (
          <FriendCalendar
            handleColorChipToggle={context.handleColorChipToggle}
            to_user={selectedUser}
            handleShowCalendar={handleShowCalendar}
          />
        )}
      </div>
    </div>
  );
}
