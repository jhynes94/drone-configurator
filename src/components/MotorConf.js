import ProgressBar from 'react-bootstrap/ProgressBar'

const MotorConfig = () => {
    return(
        <div className="MotorConfig">
            Select a Motor:
            <ProgressBar now={60} />
        </div>
    );
}

export default MotorConfig