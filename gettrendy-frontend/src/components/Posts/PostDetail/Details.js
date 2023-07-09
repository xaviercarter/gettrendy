
import React from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';


const PostDetails = () => {
  const params = useParams();

  const postList = useSelector(state => state?.post?.postList);
  
  console.log({postList, params})
  let selectPost = postList?.filter((item) => item._id === params.id);
  selectPost = selectPost?.[0]

  return (
    <>
      <section class="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <div class="container px-4 mx-auto">
          {/* Post Image */}
          <img
            class="mb-24 w-full h-96 object-cover"
            src={selectPost?.image}
            alt=""
          />
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
              {/* {post?.title} */}{selectPost?.title}
            </h2>

            {/* User */}
            <div class="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                class="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src={selectPost?.image}
                alt=""
              />
              <div class="text-left">
                <h4 class="mb-1 text-2xl font-bold text-gray-50">
                  <span class="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                    {/* {post?.user?.fullName} */}Fullname
                  </span>
                </h4>
                <p class="text-gray-500">
                  {/* <DateFormatter date={post?.createdAt} /> */}
                  created At
                </p>
              </div>
            </div>
            {/* Post description */}
            <div class="max-w-xl mx-auto">
              <p class="mb-6 text-left  text-xl text-gray-200">
                {/* {post?.description} */}
               {selectPost?.description}
                {/* Show delete and update btn if created user */}
                <p class="flex">
                  <Link class="p-3">
                    <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                  </Link>
                  <button class="ml-3">
                    <TrashIcon class="h-8 mt-3 text-red-600" />
                  </button>
                </p>
              </p>
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}

        <div className="flex justify-center  items-center">
          {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
          CommentsList
        </div>
      </section>
    </>
  );
};

export default PostDetails;
