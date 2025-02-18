import classNames from 'classnames';

interface DotsProps {
    dots: JSX.Element[];
}
const Dots = ({ dots = [] }: DotsProps) => {
    return (
        <div className="mt-4 w-full">
            <ul className="flex w-full list-none flex-row justify-center gap-2">
                {dots?.map((element, index) => {
                    const { className } = element.props as {
                        className: string;
                    };

                    const isActive = className === 'slick-active';

                    const classes = classNames(
                        'h-2 rounded transition-all duration-500 ease-in-out',
                        className,
                        {
                            'w-2': !isActive,
                            'w-4': isActive,
                            'bg-gray-300': !isActive,
                            'bg-white': isActive,
                        }
                    );

                    return <button key={index} className={classes}></button>;
                })}
            </ul>
        </div>
    );
};

export default Dots;
