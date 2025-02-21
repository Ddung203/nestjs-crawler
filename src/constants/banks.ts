type BankData = {
  id: number;
  code: string;
  bin: string;
  shortName: string;
};

export class Banks {
  private static banks: BankData[] = [
    {
      id: 17,
      code: "ICB",
      bin: "970415",
      shortName: "VietinBank",
    },
    {
      id: 43,
      code: "VCB",
      bin: "970436",
      shortName: "Vietcombank",
    },
    {
      id: 4,
      code: "BIDV",
      bin: "970418",
      shortName: "BIDV",
    },
    {
      id: 42,
      code: "VBA",
      bin: "970405",
      shortName: "Agribank",
    },
    {
      id: 26,
      code: "OCB",
      bin: "970448",
      shortName: "OCB",
    },
    {
      id: 21,
      code: "MB",
      bin: "970422",
      shortName: "MBBank",
    },
    {
      id: 38,
      code: "TCB",
      bin: "970407",
      shortName: "Techcombank",
    },
    {
      id: 2,
      code: "ACB",
      bin: "970416",
      shortName: "ACB",
    },
    {
      id: 47,
      code: "VPB",
      bin: "970432",
      shortName: "VPBank",
    },
    {
      id: 39,
      code: "TPB",
      bin: "970423",
      shortName: "TPBank",
    },
    {
      id: 36,
      code: "STB",
      bin: "970403",
      shortName: "Sacombank",
    },
    {
      id: 12,
      code: "HDB",
      bin: "970437",
      shortName: "HDBank",
    },
    {
      id: 44,
      code: "VCCB",
      bin: "970454",
      shortName: "VietCapitalBank",
    },
    {
      id: 31,
      code: "SCB",
      bin: "970429",
      shortName: "SCB",
    },
    {
      id: 45,
      code: "VIB",
      bin: "970441",
      shortName: "VIB",
    },
    {
      id: 35,
      code: "SHB",
      bin: "970443",
      shortName: "SHB",
    },
    {
      id: 10,
      code: "EIB",
      bin: "970431",
      shortName: "Eximbank",
    },
    {
      id: 22,
      code: "MSB",
      bin: "970426",
      shortName: "MSB",
    },
    {
      id: 53,
      code: "CAKE",
      bin: "546034",
      shortName: "CAKE",
    },
    {
      id: 54,
      code: "Ubank",
      bin: "546035",
      shortName: "Ubank",
    },
    {
      id: 58,
      code: "TIMO",
      bin: "963388",
      shortName: "Timo",
    },
    {
      id: 57,
      code: "VTLMONEY",
      bin: "971005",
      shortName: "ViettelMoney",
    },
    {
      id: 56,
      code: "VNPTMONEY",
      bin: "971011",
      shortName: "VNPTMoney",
    },
    {
      id: 34,
      code: "SGICB",
      bin: "970400",
      shortName: "SaigonBank",
    },
    {
      id: 3,
      code: "BAB",
      bin: "970409",
      shortName: "BacABank",
    },
    {
      id: 30,
      code: "PVCB",
      bin: "970412",
      shortName: "PVcomBank",
    },
    {
      id: 27,
      code: "Oceanbank",
      bin: "970414",
      shortName: "Oceanbank",
    },
    {
      id: 24,
      code: "NCB",
      bin: "970419",
      shortName: "NCB",
    },
    {
      id: 37,
      code: "SHBVN",
      bin: "970424",
      shortName: "ShinhanBank",
    },
    {
      id: 1,
      code: "ABB",
      bin: "970425",
      shortName: "ABBANK",
    },
    {
      id: 41,
      code: "VAB",
      bin: "970427",
      shortName: "VietABank",
    },
    {
      id: 23,
      code: "NAB",
      bin: "970428",
      shortName: "NamABank",
    },
    {
      id: 29,
      code: "PGB",
      bin: "970430",
      shortName: "PGBank",
    },
    {
      id: 46,
      code: "VIETBANK",
      bin: "970433",
      shortName: "VietBank",
    },
    {
      id: 5,
      code: "BVB",
      bin: "970438",
      shortName: "BaoVietBank",
    },
    {
      id: 33,
      code: "SEAB",
      bin: "970440",
      shortName: "SeABank",
    },
    {
      id: 52,
      code: "COOPBANK",
      bin: "970446",
      shortName: "COOPBANK",
    },
    {
      id: 20,
      code: "LPB",
      bin: "970449",
      shortName: "LPBank",
    },
    {
      id: 19,
      code: "KLB",
      bin: "970452",
      shortName: "KienLongBank",
    },
    {
      id: 55,
      code: "KBank",
      bin: "668888",
      shortName: "KBank",
    },
    {
      id: 50,
      code: "KBHN",
      bin: "970462",
      shortName: "KookminHN",
    },
    {
      id: 60,
      code: "KEBHANAHCM",
      bin: "970466",
      shortName: "KEBHanaHCM",
    },
    {
      id: 61,
      code: "KEBHANAHN",
      bin: "970467",
      shortName: "KEBHANAHN",
    },
    {
      id: 62,
      code: "MAFC",
      bin: "977777",
      shortName: "MAFC",
    },
    {
      id: 59,
      code: "CITIBANK",
      bin: "533948",
      shortName: "Citibank",
    },
    {
      id: 51,
      code: "KBHCM",
      bin: "970463",
      shortName: "KookminHCM",
    },
    {
      id: 63,
      code: "VBSP",
      bin: "999888",
      shortName: "VBSP",
    },
    {
      id: 49,
      code: "WVN",
      bin: "970457",
      shortName: "Woori",
    },
    {
      id: 48,
      code: "VRB",
      bin: "970421",
      shortName: "VRB",
    },
    {
      id: 40,
      code: "UOB",
      bin: "970458",
      shortName: "UnitedOverseas",
    },
    {
      id: 32,
      code: "SCVN",
      bin: "970410",
      shortName: "StandardChartered",
    },
    {
      id: 28,
      code: "PBVN",
      bin: "970439",
      shortName: "PublicBank",
    },
    {
      id: 25,
      code: "NHB HN",
      bin: "801011",
      shortName: "Nonghyup",
    },
    {
      id: 18,
      code: "IVB",
      bin: "970434",
      shortName: "IndovinaBank",
    },
    {
      id: 16,
      code: "IBK - HCM",
      bin: "970456",
      shortName: "IBKHCM",
    },
    {
      id: 15,
      code: "IBK - HN",
      bin: "970455",
      shortName: "IBKHN",
    },
    {
      id: 14,
      code: "HSBC",
      bin: "458761",
      shortName: "HSBC",
    },
    {
      id: 13,
      code: "HLBVN",
      bin: "970442",
      shortName: "HongLeong",
    },
    {
      id: 11,
      code: "GPB",
      bin: "970408",
      shortName: "GPBank",
    },
    {
      id: 9,
      code: "DOB",
      bin: "970406",
      shortName: "DongABank",
    },
    {
      id: 8,
      code: "DBS",
      bin: "796500",
      shortName: "DBSBank",
    },
    {
      id: 7,
      code: "CIMB",
      bin: "422589",
      shortName: "CIMB",
    },
    {
      id: 6,
      code: "CBB",
      bin: "970444",
      shortName: "CBBank",
    },
  ];

  static checkIfMatchExists(query: string) {
    return this.banks.some((bank) =>
      Object.values(bank).some((value) => String(value).toLowerCase().includes(query.toLowerCase())),
    );
  }
}
