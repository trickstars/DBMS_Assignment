import RentalPost from "./RentalPost"
import EmptySection from './EmptySection';


const PostList = ({postsInfo}) => {


  return (
    <div className="flex flex-col gap-4 px-3 py-3 border border-gray-300 rounded-md h-fit">
      <p className="text-lg font-semibold mr-5">
        Tin đã lưu
      </p>

      {postsInfo.length > 0 
        ? postsInfo.map((post, i) => {
          return (
            <RentalPost 
              key={i}
              {...post}
            />
          )
        })
        : <EmptySection />
      }
    </div>
  )
}

export default PostList
