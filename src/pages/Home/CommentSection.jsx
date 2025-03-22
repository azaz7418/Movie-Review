/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../redux/features/reviewSlice";
import { useState } from "react";
import { filterReviewsById, getComment } from "../../utils/utilitis";
import { Input } from "antd";
import { useQuery } from "@tanstack/react-query";
const { TextArea } = Input;

const CommentSection = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const { reviews } = useSelector((state) => state.reviews);
  const reviewHandler = () => {
    dispatch(setReviews({ movieId: id, review: value }));
    setValue("");
  };

  const { data,} = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getComment(id),
  });
  return (
    <div>
      <div className=" container border-y-2 border-[#d62929] bg-black xl:h-full md:h-full md:flex xl:flex  gap-8">
        <div>
          <div className="">
            <h1 className="text-white text-2xl ml-5 ">Comments:</h1>
            <div>
              {data?.map((item, index) => {
                return (
                  <div key={index} className="p-5 border-b-2 border-red-300">
                    <h2 className="text-[#d62929] uppercase text-xl font-semibold">-{item?.author}</h2>
                    <p className=" text-white">{item.content}</p>
                  </div>
                );
              })}
            </div>

            <div>
              {filterReviewsById(reviews, id)?.map((item, ind) => (
                <div className="p-5 border-b-2 border-red-300" key={ind}>
                    <h2 className="text-[#d62929] uppercase text-xl font-semibold">-person-1</h2>
                  <p className=" text-white"> {item?.review}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end items-end mt-5 gap-4 w-1/2">
            <TextArea
            rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Entre Comment"
              rows={4}
              autoSize
              className="  h-5"
            />
            <button
              className=" py-2 px-5  bg-[#d62929] rounded-md font-semibold text-red-200 hover:text-red-50 active:bg-[#c22f2f]"
              onClick={reviewHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
