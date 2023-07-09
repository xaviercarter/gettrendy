import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createpostAction, updatePostAction } from "../../../redux/slices/posts/postSlices";
import baseURL from './../../../utils/baseURL';
import axios from 'axios'
import { useEffect } from 'react';
import { useParams } from "react-router-dom";


// form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function UpdatePost() {
  const params = useParams();
  const dispatch = useDispatch();
  // select store data
  const post = useSelector(state => state?.post);

  const { isCreated, loading, appErr, serverErr, postList } = post;
  let selectPost = postList?.filter((item) => item._id === params.id);
  selectPost = selectPost?.[0]


  // formik
  const formik = useFormik({
    initialValues: {
      title: selectPost?.title || '',
      Description: selectPost?.description || '',
    },
    onSubmit: async values => {
      // dispatch the action to create a post
      const allValues = { ...values, _id: params?.id }
      dispatch(updatePostAction(allValues));
    },
    validationSchema: formSchema,
  });

//////////////////////////////////////////////////////////////////
// redirect if post created                                     //
//////////////////////////////////////////////////////////////////
if(isCreated) return <Redirect to="/posts" />;


return (
  <>
    <div className="min-h-screen bg-white-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black-300">
          Update Post
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-purple-300 hover:text-indigo-500">
            Get trendy with your ideas!
          </p>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                {/* Title */}
                <input
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">{formik?.touched?.title}</div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              {/* Description */}
              <textarea
                value={formik.values.description|| formik.values.Description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* Err msg */}
              <div className="text-red-500">{formik?.touched?.description}</div>
            </div>
            <div>
              {/* Submit btn */}
              {loading ? (
                <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Post
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
);
}
