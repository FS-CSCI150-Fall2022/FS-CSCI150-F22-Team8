import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmarker } from '../../../components/Bookmarker';
import { DislikeThumb } from '../../../components/DislikeThumb';
import { LikeThumb } from '../../../components/LikeThumb';
import { formatNumber } from '../../../utils/formatNumber';
import { usePutUserStatusOnPostMutation } from './TopBar.hook';

interface TopBarProp {
  likes: number;
  dislikes: number;
  isLike: boolean;
  isDislike: boolean;
  isSave: boolean;
  postId: string;
}

export const TopBar: FC<TopBarProp> = ({
  likes,
  dislikes,
  isLike,
  isDislike,
  isSave,
  postId,
}): JSX.Element => {
  const navigate = useNavigate();
  const { putLikeMutation, putDislikeMutation, putSaveMutation } =
    usePutUserStatusOnPostMutation(postId);
  return (
    <div className="absolute flex gap-3 mb-2 p-[2px] w-[calc(100%-32px)] border-2 rounded-md bg-secondary-black border-border-black">
      <div className="flex gap-4 pl-1">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => putLikeMutation.mutate()}
        >
          {/* <img
            src="../../../assets/img/like.svg"
            className="w-5 h-5 cursor-pointer"
            alt="like"
          /> */}
          <LikeThumb isTrue={isLike} />
          <p className="truncate pl-[2px] pt-[1px] text-sm text-white">
            {formatNumber(likes)}
          </p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => putDislikeMutation.mutate()}
        >
          {/* <img
            src="../../../assets/img/dislike.svg"
            className="w-5 h-5 cursor-pointer"
            alt="dislike"
          /> */}
          <DislikeThumb isTrue={isDislike} />
          <p className="truncate pl-[2px] pt-[1px] text-sm text-white">
            {formatNumber(dislikes)}
          </p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => putSaveMutation.mutate()}
        >
          {/* <img
            src="../../../assets/img/dislike.svg"
            className="w-5 h-5 cursor-pointer"
            alt="save"
          /> */}
          <Bookmarker isTrue={isSave} />
        </div>
      </div>

      <img
        src="../../../assets/img/close-hanger.svg"
        className="w-8 h-8 cursor-pointer ml-auto mr-5"
        alt="close"
        onClick={() => navigate(-1)}
      />
      {/* <img src="../../../assets/img/close.svg" className="w-6 h-6 cursor-pointer" alt="like" /> */}
    </div>
  );
};
