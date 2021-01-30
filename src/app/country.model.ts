export interface Country {
    
    country: string,
    countryCode: string,
    slug:string,
    newConfirmed: number,
    totalConfirmed: number,
    newDeaths: number,
    totalDeaths: number,
    newRecovered: number,
    totalRecovered: number,
    date: any
    mortalityRate: any;
    activeCases: any;
    recoveryRate: any;
}
