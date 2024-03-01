function CountryItem({ country: { country, countryCode } }) {
    return (
        <div className="country text-white relative w-[190px] h-[140px] flex items-center justify-center rounded-md border">
            <img
                src={`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png 2x`}
                width="160"
                alt="flage"
            />
            <h3 className="z-10 absolute font-bold">{country}</h3>
        </div>
    );
}

export default CountryItem;
