import moment from "moment";

const Footer = () => {
    return (
        <footer className="flex flex-row items-center justify-betwen py-0.5 px-4 border-t bg-white">
            <div className="flex container mx-auto">
                <div className="flex flex-1 justify-start">
                    <p className="text-xs font-normal text-gray-700">
                        {moment().format('YYYY')}&copy; - Licenciado para -
                        {/* {confemp[0]?.empresa} - CNPJ: {confemp[0]?.cnpj} */}
                    </p>
                </div>
                <div className="flex flex-1 justify-end">
                    <a href="https://megb.com.br/" target="_blank" rel="noopener noreferrer">
                        <span className="text-xs text-megb-yellow font-semibold">MEGB</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;