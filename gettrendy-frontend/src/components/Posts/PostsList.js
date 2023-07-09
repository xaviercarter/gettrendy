import { useEffect, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchPostsAction, updatePostAction } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { deletePostAction } from './../../redux/slices/posts/postSlices';



export default function PostsList() {
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  const [deletedProducts, setDeletedProducts] = useState([]);

  // select post from store
  const post = useSelector(state => state?.post);

  const { postList, isCreated, loading, appErr, serverErr } = post;

  const handleDelete = (id) => {
    dispatch(deletePostAction(id));
    const deleteProduct = postList.filter((item) => item._id !== id);
    setDeletedProducts(deleteProduct)
  }

  useEffect(() => {
    if (postList)
      setDeletedProducts(postList)
  }, [postList])


  return (
    <>
      <section>
        <div className="py-20 bg-gray-200 min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              <div className="w-full lg:w-1/2">
                <span className="text-gray-600 font-bold">
                  Trendy Fashion
                </span>
                <h2 className="text-4xl text-black-400 lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2>
              </div>
              <div className=" block text-right w-1/2">
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-gray-200 shadow rounded">
                  <h4 className="mb-4 text-black-100 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    <div></div>

                    <div className="text-red-400 text-base">
                      {/* will add categories */}
                    </div>
                    <li>
                      <p className="block cursor-pointer py-2 px-3 mb-4 rounded text-black-500 font-bold bg-gray-200">
                      category list filter
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-3/4 px-3">
                {/* Post goes here */}

                {loading ? (
                  <h1>Loading...</h1>
                ) : appErr || serverErr ? (
                  <h1>Err</h1>
                ) : deletedProducts?.lenght <= 0 ? (
                  <h1>No Post Found</h1>
                ) : (
                  deletedProducts?.map(post => (
                    <div key={post?._id} className="flex items-center flex-wrap bg-gray-200 -mx-3  lg:mb-6">
                      <div className='flex items-center w-full px-3 justify-end'>
                      <button className='text-white bg-red-600 rounded-lg py-2 px-4 mb-2 md: -mb-10 font-bold' onClick={() => handleDelete(post?._id)}>Delete Post</button>
                      </div>
                      <div className="mb-10  w-full lg:w-1/4 px-3">
                        <Link to={`/update-post/${post?._id}`}>
                          {/* Post image */}
                          <img
                            className="w-full h-full object-cover rounded"
                            src={post?.image}
                            alt=""
                          />
                        </Link>
                        {/* Likes, views dislikes */}
                        <div>
                          {/* Likes */}
                          <div>
                          </div>
                          <div>
                          </div>
                          <div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-3/4 px-3">
                        <Link to={`/update-post/${post?._id}`} className="hover:underline">
                          <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                            {/* {capitalizeWord(post?.title)} */}
                            {post?.title}
                          </h3>
                        </Link>
                        <p className="text-gray-300">{post?.description}</p>

                       
                        {/* User Avatar */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <Link>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePhoto}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link className="text-yellow-400 hover:underline ">
                                {post?.user?.firstName} {post?.user?.lastName}
                              </Link>
                      <Link to={`/post-details/${post?._id}`} className='text-white bg-purple-300 rounded-lg py-2 px-4 mb-2 md: -mb-10 font-bold' onClick={() => handleDelete(post?._id)}>View Post</Link>

                            </p>
                            <div className="flex space-x-1 text-sm text-green-500">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                        {/* <p className="text-gray-500">
                            Quisque id sagittis turpis. Nulla sollicitudin rutrum
                            eros eu dictum...
                           </p> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div className="skew bg-green-500 skew-bottom mr-for-radius">
          </div>
          <div className="skew bg-gray-500  skew-bottom ml-for-radius">
          </div>
        </div>
      </section>
    </>
  );
}