/** Signup/profile dropdown option: ISO 3166-1 alpha-2 code + English display name. */
export interface CountryOption {
  code: string;
  name: string;
}

// ISO 3166-1 alpha-2 codes; display names come from Intl so they stay correct and localized.
const COUNTRY_CODES =
  "AF AX AL DZ AS AD AO AI AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BA BW BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR XK KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VE VN VG VI WF EH YE ZM ZW".split(
    " ",
  );

/**
 * Country options sorted by name. Call from a Server Component and pass the result down,
 * so server and browser never disagree on names (avoids hydration mismatches).
 */
export function countryOptions(): CountryOption[] {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  return COUNTRY_CODES.map((code) => ({
    code,
    name: names.of(code) ?? code,
  })).sort((a, b) => a.name.localeCompare(b.name));
}

/** "Number of contacts" ranges, shared by signup and profile completion. */
export const CONTACT_RANGES = ["0-500", "500-2k", "2k-10k", "10k+"] as const;
