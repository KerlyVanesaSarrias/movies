import image from '../../assets/images/image_error404.svg';

const PageError = () => {
    return (
        <div className="w-full h-full p-10 flex justify-center">
            <img className="w-1/3" src={image} alt="404 Error" />
        </div>
    );
};
export default PageError;
