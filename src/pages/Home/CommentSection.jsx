/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../redux/features/reviewSlice";
import { useState } from "react";
import { filterReviewsById, getComment } from "../../utils/utilitis";
import { Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { FaUserCircle } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
const { TextArea } = Input;

const CommentSection = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { reviews } = useSelector((state) => state.reviews);
  const { data } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getComment(id),
  });
console.log(data);

  const reviewHandler = () => {
    if (!value.trim()) return;
    dispatch(setReviews({ movieId: id, review: value }));
    setValue("");
  };

  return (
    <section className="py-8 bg-primary-dark/95">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Comments Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-accent">
            Discussion
            <span className="ml-2 text-lg text-neutral-400">
              {(data?.length || 0) + (filterReviewsById(reviews, id)?.length || 0)} comments
            </span>
          </h2>
        </div>

        {/* Comment Input Section */}
        <div className="mb-8">
          <div className="bg-primary/50 rounded-lg p-4">
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="bg-primary-dark focus:bg-transparent text-neutral-50 placeholder-neutral-400 border border-secondary/30 rounded-lg p-4 mb-4 resize-none focus:border-accent focus:ring-1 focus:ring-accent"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-400">
                {500 - (value?.length || 0)} characters remaining
              </span>
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${value.trim() 
                  ? 'bg-accent hover:bg-accent-hover text-primary-dark' 
                  : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'}`}
                onClick={reviewHandler}
                disabled={!value.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {/* API Comments */}
          {data?.results?.map((item, index) => (
            <div 
              key={index} 
              className="bg-primary/50 rounded-lg p-6 transform hover:translate-x-1 transition-transform duration-200"
            >
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-accent text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-accent">{item?.author}</h3>
                  <div className="flex items-center text-sm text-neutral-400">
                    <BiTime className="mr-1" />
                    <span>Just now</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-200 leading-relaxed">{item.content}</p>
            </div>
          ))}

          {/* User Reviews */}
          {filterReviewsById(reviews, id)?.map((item, ind) => (
            <div 
              key={ind} 
              className="bg-primary/50 rounded-lg p-6 transform hover:translate-x-1 transition-transform duration-200"
            >
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-secondary text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-secondary">User</h3>
                  <div className="flex items-center text-sm text-neutral-400">
                    <BiTime className="mr-1" />
                    <span>Just now</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-200 leading-relaxed">{item?.review}</p>
            </div>
          ))}

          {/* Empty State */}
          {!data?.length && !filterReviewsById(reviews, id)?.length && (
            <div className="text-center py-8">
              <p className="text-neutral-400">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
