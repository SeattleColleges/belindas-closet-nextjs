import QRCodeGenerator from "@/components/QRCodeGenerator";

const Home: React.FC = () => {
    return (
        <div>
            {/* <title> QR Code</title> */}

            <main>
                <h1>QR Code Generator</h1>
                <QRCodeGenerator
                    value="https://www.test.com"
                    size={256}
                    bgColor="#000000"
                    fgColor="#FFFFFF"
                    level="H"
                    renderAs="svg"
                    />
            </main>
        </div>

        
    );
};

export default Home;