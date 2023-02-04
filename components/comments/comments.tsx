import React, { FC, Fragment, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';

import {
  AddCommentForm,
  AddCommentFormBtnContainer,
  CommentBlock,
  CommentListWrapper,
  StyledComment,
  StyledCommentContainer,
  StyledCommentInput,
  StyledCommentList,
  StyledMomentBlock,
  UserInfo,
} from '@/styles/components/comment.styled';
import ButtonSm from '../ui/button-sm/button-sm';
import { theme } from '@/utils/theme.styled';
import Input from '../ui/input/input';
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetCommentsQuery,
} from '@/redux/features/apiSlice';
import { useRouter } from 'next/router';
import commentSechema from '@/utils/yup-schema/commentSechema';
import {
  CommentFieldValues,
  IComment,
} from '@/utils/types/comments/comment.interfaces';
import moment from 'moment';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import IconButton from '../ui/icon-button/icon-button';
import { BsFillXCircleFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import ConfirmModal from '../ui/confirm-modal/confirm-modal';
import CloseIcon from '../ui/close-icon/close-icon';
import { IFood } from '@/utils/types/foods/food.interface';

const commentsBlockVariants: Variants = {
  initial: { opacity: 0, x: -50, transition: { duration: 0 } },
  animation: (isDeleting) => ({
    opacity: isDeleting ? 0.4 : 1,
    x: 0,

    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delay: 0.2,
    },
  }),
};

const commentItemVariants: Variants = {
  initial: { opacity: 0, x: -100 },
  animation: {
    x: 0,
    opacity: 1,
  },
  warning: {
    x: [-30, 0, -20, 0, -10, 0],
  },
};

interface CommentsProps {
  modalMode?: boolean;
  closeModal?: () => void;
  foodSlug: IFood['slug'];
}

const Comments: FC<CommentsProps> = ({ modalMode, closeModal, foodSlug }) => {
  const [addComment, { isLoading: isSending }] = useAddCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [editComment, { isLoading: isEditing }] = useEditCommentMutation();
  const {
    formState: { errors },
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
  } = useForm<CommentFieldValues>({
    resolver: yupResolver(commentSechema),
  });
  const [commentToEdit, setCommentToEdit] = useState<IComment>();
  const [commentToDel, setCommentToDel] = useState<IComment>();
  const router = useRouter();
  const { slug } = router.query;
  const { status, data: currentUser } = useSession();
  const { data: comments } = useGetCommentsQuery(
    modalMode ? foodSlug : (slug as string)
  );
  const { ref, inView } = useInView();
  const unAuthTextAnimeController = useAnimationControls();
  const [showDeleteCommentConfirmModal, setShowDeleteCommentConfirmModal] =
    useState(false);

  const onCommentSubmit: SubmitHandler<CommentFieldValues> = async (
    formStates
  ) => {
    const text = formStates.comment;

    try {
      if (commentToEdit) {
        await editComment({ ...commentToEdit, text: formStates.comment });
        setCommentToEdit(undefined);
        reset();
        return;
      }

      await addComment({
        foodSlug: (slug || foodSlug) as string,
        text,
        userEmail: currentUser?.user?.email!,
      });
      reset();
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const addCommentHandler = () => {
    if (status === 'unauthenticated') {
      unAuthTextAnimeController.start(commentItemVariants.warning);
      return;
    }
  };

  const deleteCommentHandler = async () => {
    if (!commentToDel) return;
    try {
      console.log(commentToDel);
      const ress = await deleteComment(commentToDel);
    } catch (error) {
      console.log(error);
    }
  };

  const editCommentHandler = (comment: IComment) => {
    setValue('comment', comment.text);
    setCommentToEdit(comment);
  };

  if (!comments) return <></>;

  console.log(slug, 'slug');

  return (
    <>
      <StyledComment>
        {modalMode && (
          <IconButton
            onClick={closeModal}
            style={{ position: 'absolute', left: 0 }}
          >
            <CloseIcon size="1.4rem" />
          </IconButton>
        )}
        <h4>
          نظرات
          <span style={{ marginRight: '.5rem', fontSize: '.8rem' }}>
            {`(${
              comments.length <= 10 ? `${comments.length} نظر` : '+10 نظر'
            })`}
          </span>
        </h4>

        <StyledCommentContainer
          variants={commentsBlockVariants}
          initial="initial"
          animate={inView ? 'animation' : 'initial'}
          exit="initial"
          ref={ref}
          // transition={{ delay: 1.5 }}
          custom={isDeleting}
        >
          <CommentListWrapper>
            <StyledCommentList
              as={motion.div}
              variants={commentsBlockVariants}
              initial="initial"
              animate={inView ? 'animation' : 'initial'}
            >
              <AnimatePresence>
                {comments.length <= 0 ? (
                  <h5>اولین نفری باشید که نظر ثبت می کند !</h5>
                ) : (
                  comments?.map((comment) => (
                    <Fragment key={comment.id}>
                      <ConfirmModal
                        show={showDeleteCommentConfirmModal}
                        onCancel={setShowDeleteCommentConfirmModal.bind(
                          null,
                          false
                        )}
                        onConfirm={deleteCommentHandler}
                        modalBody="نظر خذف شود ؟"
                      />
                      <CommentBlock
                        as={motion.div}
                        variants={commentItemVariants}
                      >
                        <UserInfo>
                          <img
                            src={
                              `/${comment.user.image}` ||
                              '/images/profile-images/default.png'
                            }
                            alt="user image"
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                            }}
                          />
                          <h5>{comment.user?.firstName}</h5>
                          <span style={{ marginRight: 'auto' }}>
                            {currentUser?.user?.email ===
                              comment.user.email && (
                              <>
                                <IconButton
                                  tapEffect
                                  style={{ outline: 'none' }}
                                  onClick={editCommentHandler.bind(
                                    null,
                                    comment
                                  )}
                                >
                                  <AiFillEdit
                                    color={theme.colors.dark}
                                    size={'1.2rem'}
                                  />
                                </IconButton>

                                <IconButton
                                  onClick={() => {
                                    setCommentToDel(comment);
                                    setShowDeleteCommentConfirmModal(true);
                                  }}
                                  tapEffect
                                  style={{ outline: 'none' }}
                                >
                                  <BsFillXCircleFill
                                    color={theme.colors.dark}
                                    size={'1rem'}
                                  />
                                </IconButton>
                              </>
                            )}
                          </span>
                        </UserInfo>
                        <p>{comment.text}</p>
                        <StyledMomentBlock>
                          {comment.createdAt
                            ? moment()
                                .subtract(
                                  Date.now() -
                                    Date.parse(comment.createdAt as string),
                                  'millisecond'
                                )
                                .calendar()
                            : ''}
                        </StyledMomentBlock>
                      </CommentBlock>
                    </Fragment>
                  ))
                )}
              </AnimatePresence>
            </StyledCommentList>
          </CommentListWrapper>

          <AddCommentForm
            variants={commentItemVariants}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit(onCommentSubmit)}
          >
            {status === 'unauthenticated' && (
              <motion.span animate={unAuthTextAnimeController}>
                * لطفا برای ثبت نظر ابتدا وارد شوید !
              </motion.span>
            )}
            <StyledCommentInput>
              <Input
                textarea
                disabled={status === 'unauthenticated'}
                register={register}
                errorMessage={errors.comment?.message}
                invalid={!!errors.comment || status === 'unauthenticated'}
                label={'نظر خود را بنویسید'}
                name="comment"
              />
            </StyledCommentInput>
            <AddCommentFormBtnContainer>
              <ButtonSm
                type="submit"
                text={commentToEdit ? 'ویرایش نظر' : 'ارسال نظر'}
                color={theme.colors.blue}
                onClick={addCommentHandler}
                disabled={isSending || isEditing}
                loading={isSending || isEditing}
              />

              {commentToEdit && (
                <ButtonSm
                  type="button"
                  text="لغو"
                  color={theme.colors.secondary}
                  textColor={theme.colors.dark}
                  onClick={() => {
                    setCommentToEdit(undefined);
                    reset();
                  }}
                />
              )}
            </AddCommentFormBtnContainer>
          </AddCommentForm>
        </StyledCommentContainer>
      </StyledComment>
    </>
  );
};

export default Comments;
