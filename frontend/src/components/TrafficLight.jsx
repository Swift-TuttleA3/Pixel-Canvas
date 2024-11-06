const TrafficLight = ({ isGreen }) => {
    return (
        <div className="flex flex-col items-center mr-10">
            <div
                className={`w-6 h-6 border border-silver rounded-full ${isGreen ? 'bg-green-500' : 'bg-red-500'} mb-1`}
            ></div>
            <div className="text-2xl">{isGreen ? '😊' : '😞'}</div>
        </div>
    );
};

export default TrafficLight;