import React from 'react';
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
  CommentBlock,
  CommentListWrapper,
  StyledComment,
  StyledCommentInput,
  StyledCommentList,
} from '@/styles/components/comment.styled';
import ButtonSm from '../ui/button-sm/button-sm';
import { theme } from '@/utils/theme.styled';
import Input from '../ui/input/input';
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '@/redux/features/apiSlice';
import { useRouter } from 'next/router';
import commentSechema from '@/utils/yup-schema/commentSechema';
import { CommentFieldValues } from '@/utils/types/comments/comment.interfaces';

const commentsBlockVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animation: {
    opacity: 1,
    x: 0,

    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delay: 0.2,
    },
  },
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

const Comment = () => {
  const [addComment, { isLoading: isSending }] = useAddCommentMutation();
  const {
    formState: { errors },
    reset,
    watch,
    register,
    handleSubmit,
  } = useForm<CommentFieldValues>({
    resolver: yupResolver(commentSechema),
  });
  // const [comment, setComment] = useState('second');
  const router = useRouter();
  const { slug } = router.query;
  const { status, data } = useSession();
  const { data: comments } = useGetCommentsQuery(slug as string);
  const { ref, inView } = useInView();
  const unAuthTextAnimeController = useAnimationControls();

  const onCommentSubmit: SubmitHandler<CommentFieldValues> = async (
    formStates
  ) => {
    const text = formStates.comment;
    addComment({
      foodSlug: slug as string,
      text,
      userEmail: data?.user?.email!,
    });

    reset();
  };

  const addCommentBtnHandler = () => {
    if (status === 'unauthenticated') {
      unAuthTextAnimeController.start(commentItemVariants.warning);
      return;
    }
  };

  if (!comments) return <></>;

  return (
    <StyledComment
      variants={commentsBlockVariants}
      initial="initial"
      animate={inView ? 'animation' : 'initial'}
      ref={ref}
      // transition={{ delay: 1.5 }}
    >
      <h4>نظرات</h4>

      <CommentListWrapper>
        <StyledCommentList
          as={motion.div}
          variants={commentsBlockVariants}
          initial="initial"
          animate={inView ? 'animation' : 'initial'}
        >
          <AnimatePresence>
            {comments?.map((comment) => (
              <CommentBlock
                key={comment.id}
                as={motion.div}
                variants={commentItemVariants}
              >
                <h5>{comment.user?.firstName}</h5>
                <p>{comment.text}</p>
              </CommentBlock>
            ))}
          </AnimatePresence>
        </StyledCommentList>
      </CommentListWrapper>

      <AddCommentForm
        variants={commentItemVariants}
        transition={{ delay: 1 }}
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
        <ButtonSm
          type="submit"
          text={isSending ? 'Sending...' : 'ارسال نظر'}
          color={theme.colors.blue}
          onClick={addCommentBtnHandler}
        />
      </AddCommentForm>
    </StyledComment>
  );
};

export default Comment;
