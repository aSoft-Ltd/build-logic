import { kash } from './kash'
import { kollections } from './kollections'
import { symphony } from './symphony'
import { cinematic } from './cinematic'

export declare namespace geo {
    abstract class Country {
        get code(): string;
        get label(): string;
        get currency(): kash.Currency;
        get isoCode(): string;
        get dialingCode(): string;
        static get AF(): geo.Country & {
            get name(): "AF";
            get ordinal(): 0;
        };
        static get AL(): geo.Country & {
            get name(): "AL";
            get ordinal(): 1;
        };
        static get DZ(): geo.Country & {
            get name(): "DZ";
            get ordinal(): 2;
        };
        static get AS(): geo.Country & {
            get name(): "AS";
            get ordinal(): 3;
        };
        static get AD(): geo.Country & {
            get name(): "AD";
            get ordinal(): 4;
        };
        static get AO(): geo.Country & {
            get name(): "AO";
            get ordinal(): 5;
        };
        static get AI(): geo.Country & {
            get name(): "AI";
            get ordinal(): 6;
        };
        static get AG(): geo.Country & {
            get name(): "AG";
            get ordinal(): 7;
        };
        static get AR(): geo.Country & {
            get name(): "AR";
            get ordinal(): 8;
        };
        static get AM(): geo.Country & {
            get name(): "AM";
            get ordinal(): 9;
        };
        static get AW(): geo.Country & {
            get name(): "AW";
            get ordinal(): 10;
        };
        static get AU(): geo.Country & {
            get name(): "AU";
            get ordinal(): 11;
        };
        static get AZ(): geo.Country & {
            get name(): "AZ";
            get ordinal(): 12;
        };
        static get BS(): geo.Country & {
            get name(): "BS";
            get ordinal(): 13;
        };
        static get BH(): geo.Country & {
            get name(): "BH";
            get ordinal(): 14;
        };
        static get BD(): geo.Country & {
            get name(): "BD";
            get ordinal(): 15;
        };
        static get BB(): geo.Country & {
            get name(): "BB";
            get ordinal(): 16;
        };
        static get BY(): geo.Country & {
            get name(): "BY";
            get ordinal(): 17;
        };
        static get BE(): geo.Country & {
            get name(): "BE";
            get ordinal(): 18;
        };
        static get BZ(): geo.Country & {
            get name(): "BZ";
            get ordinal(): 19;
        };
        static get BJ(): geo.Country & {
            get name(): "BJ";
            get ordinal(): 20;
        };
        static get BM(): geo.Country & {
            get name(): "BM";
            get ordinal(): 21;
        };
        static get BT(): geo.Country & {
            get name(): "BT";
            get ordinal(): 22;
        };
        static get BO(): geo.Country & {
            get name(): "BO";
            get ordinal(): 23;
        };
        static get BA(): geo.Country & {
            get name(): "BA";
            get ordinal(): 24;
        };
        static get BW(): geo.Country & {
            get name(): "BW";
            get ordinal(): 25;
        };
        static get BR(): geo.Country & {
            get name(): "BR";
            get ordinal(): 26;
        };
        static get IO(): geo.Country & {
            get name(): "IO";
            get ordinal(): 27;
        };
        static get VG(): geo.Country & {
            get name(): "VG";
            get ordinal(): 28;
        };
        static get VI(): geo.Country & {
            get name(): "VI";
            get ordinal(): 29;
        };
        static get BN(): geo.Country & {
            get name(): "BN";
            get ordinal(): 30;
        };
        static get BG(): geo.Country & {
            get name(): "BG";
            get ordinal(): 31;
        };
        static get BF(): geo.Country & {
            get name(): "BF";
            get ordinal(): 32;
        };
        static get BI(): geo.Country & {
            get name(): "BI";
            get ordinal(): 33;
        };
        static get KH(): geo.Country & {
            get name(): "KH";
            get ordinal(): 34;
        };
        static get CM(): geo.Country & {
            get name(): "CM";
            get ordinal(): 35;
        };
        static get CA(): geo.Country & {
            get name(): "CA";
            get ordinal(): 36;
        };
        static get CV(): geo.Country & {
            get name(): "CV";
            get ordinal(): 37;
        };
        static get KY(): geo.Country & {
            get name(): "KY";
            get ordinal(): 38;
        };
        static get CF(): geo.Country & {
            get name(): "CF";
            get ordinal(): 39;
        };
        static get CL(): geo.Country & {
            get name(): "CL";
            get ordinal(): 40;
        };
        static get CN(): geo.Country & {
            get name(): "CN";
            get ordinal(): 41;
        };
        static get CO(): geo.Country & {
            get name(): "CO";
            get ordinal(): 42;
        };
        static get KM(): geo.Country & {
            get name(): "KM";
            get ordinal(): 43;
        };
        static get CG(): geo.Country & {
            get name(): "CG";
            get ordinal(): 44;
        };
        static get CD(): geo.Country & {
            get name(): "CD";
            get ordinal(): 45;
        };
        static get CK(): geo.Country & {
            get name(): "CK";
            get ordinal(): 46;
        };
        static get CR(): geo.Country & {
            get name(): "CR";
            get ordinal(): 47;
        };
        static get HR(): geo.Country & {
            get name(): "HR";
            get ordinal(): 48;
        };
        static get CU(): geo.Country & {
            get name(): "CU";
            get ordinal(): 49;
        };
        static get CY(): geo.Country & {
            get name(): "CY";
            get ordinal(): 50;
        };
        static get CZ(): geo.Country & {
            get name(): "CZ";
            get ordinal(): 51;
        };
        static get DK(): geo.Country & {
            get name(): "DK";
            get ordinal(): 52;
        };
        static get DJ(): geo.Country & {
            get name(): "DJ";
            get ordinal(): 53;
        };
        static get DM(): geo.Country & {
            get name(): "DM";
            get ordinal(): 54;
        };
        static get DO(): geo.Country & {
            get name(): "DO";
            get ordinal(): 55;
        };
        static get EC(): geo.Country & {
            get name(): "EC";
            get ordinal(): 56;
        };
        static get EG(): geo.Country & {
            get name(): "EG";
            get ordinal(): 57;
        };
        static get SV(): geo.Country & {
            get name(): "SV";
            get ordinal(): 58;
        };
        static get GQ(): geo.Country & {
            get name(): "GQ";
            get ordinal(): 59;
        };
        static get ER(): geo.Country & {
            get name(): "ER";
            get ordinal(): 60;
        };
        static get EE(): geo.Country & {
            get name(): "EE";
            get ordinal(): 61;
        };
        static get ET(): geo.Country & {
            get name(): "ET";
            get ordinal(): 62;
        };
        static get FK(): geo.Country & {
            get name(): "FK";
            get ordinal(): 63;
        };
        static get FO(): geo.Country & {
            get name(): "FO";
            get ordinal(): 64;
        };
        static get FJ(): geo.Country & {
            get name(): "FJ";
            get ordinal(): 65;
        };
        static get FI(): geo.Country & {
            get name(): "FI";
            get ordinal(): 66;
        };
        static get FR(): geo.Country & {
            get name(): "FR";
            get ordinal(): 67;
        };
        static get GF(): geo.Country & {
            get name(): "GF";
            get ordinal(): 68;
        };
        static get PF(): geo.Country & {
            get name(): "PF";
            get ordinal(): 69;
        };
        static get GA(): geo.Country & {
            get name(): "GA";
            get ordinal(): 70;
        };
        static get GM(): geo.Country & {
            get name(): "GM";
            get ordinal(): 71;
        };
        static get GE(): geo.Country & {
            get name(): "GE";
            get ordinal(): 72;
        };
        static get DE(): geo.Country & {
            get name(): "DE";
            get ordinal(): 73;
        };
        static get GH(): geo.Country & {
            get name(): "GH";
            get ordinal(): 74;
        };
        static get GI(): geo.Country & {
            get name(): "GI";
            get ordinal(): 75;
        };
        static get GR(): geo.Country & {
            get name(): "GR";
            get ordinal(): 76;
        };
        static get GL(): geo.Country & {
            get name(): "GL";
            get ordinal(): 77;
        };
        static get GD(): geo.Country & {
            get name(): "GD";
            get ordinal(): 78;
        };
        static get GP(): geo.Country & {
            get name(): "GP";
            get ordinal(): 79;
        };
        static get GU(): geo.Country & {
            get name(): "GU";
            get ordinal(): 80;
        };
        static get GT(): geo.Country & {
            get name(): "GT";
            get ordinal(): 81;
        };
        static get GN(): geo.Country & {
            get name(): "GN";
            get ordinal(): 82;
        };
        static get GW(): geo.Country & {
            get name(): "GW";
            get ordinal(): 83;
        };
        static get GY(): geo.Country & {
            get name(): "GY";
            get ordinal(): 84;
        };
        static get HT(): geo.Country & {
            get name(): "HT";
            get ordinal(): 85;
        };
        static get VA(): geo.Country & {
            get name(): "VA";
            get ordinal(): 86;
        };
        static get HN(): geo.Country & {
            get name(): "HN";
            get ordinal(): 87;
        };
        static get HK(): geo.Country & {
            get name(): "HK";
            get ordinal(): 88;
        };
        static get HU(): geo.Country & {
            get name(): "HU";
            get ordinal(): 89;
        };
        static get IS(): geo.Country & {
            get name(): "IS";
            get ordinal(): 90;
        };
        static get IN(): geo.Country & {
            get name(): "IN";
            get ordinal(): 91;
        };
        static get ID(): geo.Country & {
            get name(): "ID";
            get ordinal(): 92;
        };
        static get CI(): geo.Country & {
            get name(): "CI";
            get ordinal(): 93;
        };
        static get IR(): geo.Country & {
            get name(): "IR";
            get ordinal(): 94;
        };
        static get IQ(): geo.Country & {
            get name(): "IQ";
            get ordinal(): 95;
        };
        static get IE(): geo.Country & {
            get name(): "IE";
            get ordinal(): 96;
        };
        static get IL(): geo.Country & {
            get name(): "IL";
            get ordinal(): 97;
        };
        static get IT(): geo.Country & {
            get name(): "IT";
            get ordinal(): 98;
        };
        static get JM(): geo.Country & {
            get name(): "JM";
            get ordinal(): 99;
        };
        static get JP(): geo.Country & {
            get name(): "JP";
            get ordinal(): 100;
        };
        static get JO(): geo.Country & {
            get name(): "JO";
            get ordinal(): 101;
        };
        static get KZ(): geo.Country & {
            get name(): "KZ";
            get ordinal(): 102;
        };
        static get KE(): geo.Country & {
            get name(): "KE";
            get ordinal(): 103;
        };
        static get KI(): geo.Country & {
            get name(): "KI";
            get ordinal(): 104;
        };
        static get KW(): geo.Country & {
            get name(): "KW";
            get ordinal(): 105;
        };
        static get KG(): geo.Country & {
            get name(): "KG";
            get ordinal(): 106;
        };
        static get LA(): geo.Country & {
            get name(): "LA";
            get ordinal(): 107;
        };
        static get LV(): geo.Country & {
            get name(): "LV";
            get ordinal(): 108;
        };
        static get LB(): geo.Country & {
            get name(): "LB";
            get ordinal(): 109;
        };
        static get LS(): geo.Country & {
            get name(): "LS";
            get ordinal(): 110;
        };
        static get LR(): geo.Country & {
            get name(): "LR";
            get ordinal(): 111;
        };
        static get LY(): geo.Country & {
            get name(): "LY";
            get ordinal(): 112;
        };
        static get LI(): geo.Country & {
            get name(): "LI";
            get ordinal(): 113;
        };
        static get LT(): geo.Country & {
            get name(): "LT";
            get ordinal(): 114;
        };
        static get LU(): geo.Country & {
            get name(): "LU";
            get ordinal(): 115;
        };
        static get MO(): geo.Country & {
            get name(): "MO";
            get ordinal(): 116;
        };
        static get MK(): geo.Country & {
            get name(): "MK";
            get ordinal(): 117;
        };
        static get MG(): geo.Country & {
            get name(): "MG";
            get ordinal(): 118;
        };
        static get MW(): geo.Country & {
            get name(): "MW";
            get ordinal(): 119;
        };
        static get MY(): geo.Country & {
            get name(): "MY";
            get ordinal(): 120;
        };
        static get MV(): geo.Country & {
            get name(): "MV";
            get ordinal(): 121;
        };
        static get ML(): geo.Country & {
            get name(): "ML";
            get ordinal(): 122;
        };
        static get MT(): geo.Country & {
            get name(): "MT";
            get ordinal(): 123;
        };
        static get MH(): geo.Country & {
            get name(): "MH";
            get ordinal(): 124;
        };
        static get MQ(): geo.Country & {
            get name(): "MQ";
            get ordinal(): 125;
        };
        static get MR(): geo.Country & {
            get name(): "MR";
            get ordinal(): 126;
        };
        static get MU(): geo.Country & {
            get name(): "MU";
            get ordinal(): 127;
        };
        static get YT(): geo.Country & {
            get name(): "YT";
            get ordinal(): 128;
        };
        static get MX(): geo.Country & {
            get name(): "MX";
            get ordinal(): 129;
        };
        static get FM(): geo.Country & {
            get name(): "FM";
            get ordinal(): 130;
        };
        static get MD(): geo.Country & {
            get name(): "MD";
            get ordinal(): 131;
        };
        static get MC(): geo.Country & {
            get name(): "MC";
            get ordinal(): 132;
        };
        static get MN(): geo.Country & {
            get name(): "MN";
            get ordinal(): 133;
        };
        static get ME(): geo.Country & {
            get name(): "ME";
            get ordinal(): 134;
        };
        static get MS(): geo.Country & {
            get name(): "MS";
            get ordinal(): 135;
        };
        static get MA(): geo.Country & {
            get name(): "MA";
            get ordinal(): 136;
        };
        static get MZ(): geo.Country & {
            get name(): "MZ";
            get ordinal(): 137;
        };
        static get MM(): geo.Country & {
            get name(): "MM";
            get ordinal(): 138;
        };
        static get NA(): geo.Country & {
            get name(): "NA";
            get ordinal(): 139;
        };
        static get NR(): geo.Country & {
            get name(): "NR";
            get ordinal(): 140;
        };
        static get NP(): geo.Country & {
            get name(): "NP";
            get ordinal(): 141;
        };
        static get NL(): geo.Country & {
            get name(): "NL";
            get ordinal(): 142;
        };
        static get NC(): geo.Country & {
            get name(): "NC";
            get ordinal(): 143;
        };
        static get NZ(): geo.Country & {
            get name(): "NZ";
            get ordinal(): 144;
        };
        static get NI(): geo.Country & {
            get name(): "NI";
            get ordinal(): 145;
        };
        static get NE(): geo.Country & {
            get name(): "NE";
            get ordinal(): 146;
        };
        static get NG(): geo.Country & {
            get name(): "NG";
            get ordinal(): 147;
        };
        static get NU(): geo.Country & {
            get name(): "NU";
            get ordinal(): 148;
        };
        static get NF(): geo.Country & {
            get name(): "NF";
            get ordinal(): 149;
        };
        static get KP(): geo.Country & {
            get name(): "KP";
            get ordinal(): 150;
        };
        static get MP(): geo.Country & {
            get name(): "MP";
            get ordinal(): 151;
        };
        static get NO(): geo.Country & {
            get name(): "NO";
            get ordinal(): 152;
        };
        static get OM(): geo.Country & {
            get name(): "OM";
            get ordinal(): 153;
        };
        static get PK(): geo.Country & {
            get name(): "PK";
            get ordinal(): 154;
        };
        static get PW(): geo.Country & {
            get name(): "PW";
            get ordinal(): 155;
        };
        static get PS(): geo.Country & {
            get name(): "PS";
            get ordinal(): 156;
        };
        static get PA(): geo.Country & {
            get name(): "PA";
            get ordinal(): 157;
        };
        static get PG(): geo.Country & {
            get name(): "PG";
            get ordinal(): 158;
        };
        static get PY(): geo.Country & {
            get name(): "PY";
            get ordinal(): 159;
        };
        static get PE(): geo.Country & {
            get name(): "PE";
            get ordinal(): 160;
        };
        static get PH(): geo.Country & {
            get name(): "PH";
            get ordinal(): 161;
        };
        static get PL(): geo.Country & {
            get name(): "PL";
            get ordinal(): 162;
        };
        static get PT(): geo.Country & {
            get name(): "PT";
            get ordinal(): 163;
        };
        static get PR(): geo.Country & {
            get name(): "PR";
            get ordinal(): 164;
        };
        static get QA(): geo.Country & {
            get name(): "QA";
            get ordinal(): 165;
        };
        static get XK(): geo.Country & {
            get name(): "XK";
            get ordinal(): 166;
        };
        static get RE(): geo.Country & {
            get name(): "RE";
            get ordinal(): 167;
        };
        static get RO(): geo.Country & {
            get name(): "RO";
            get ordinal(): 168;
        };
        static get RU(): geo.Country & {
            get name(): "RU";
            get ordinal(): 169;
        };
        static get RW(): geo.Country & {
            get name(): "RW";
            get ordinal(): 170;
        };
        static get BL(): geo.Country & {
            get name(): "BL";
            get ordinal(): 171;
        };
        static get SH(): geo.Country & {
            get name(): "SH";
            get ordinal(): 172;
        };
        static get KN(): geo.Country & {
            get name(): "KN";
            get ordinal(): 173;
        };
        static get LC(): geo.Country & {
            get name(): "LC";
            get ordinal(): 174;
        };
        static get MF(): geo.Country & {
            get name(): "MF";
            get ordinal(): 175;
        };
        static get PM(): geo.Country & {
            get name(): "PM";
            get ordinal(): 176;
        };
        static get VC(): geo.Country & {
            get name(): "VC";
            get ordinal(): 177;
        };
        static get WS(): geo.Country & {
            get name(): "WS";
            get ordinal(): 178;
        };
        static get SM(): geo.Country & {
            get name(): "SM";
            get ordinal(): 179;
        };
        static get SA(): geo.Country & {
            get name(): "SA";
            get ordinal(): 180;
        };
        static get SN(): geo.Country & {
            get name(): "SN";
            get ordinal(): 181;
        };
        static get RS(): geo.Country & {
            get name(): "RS";
            get ordinal(): 182;
        };
        static get SC(): geo.Country & {
            get name(): "SC";
            get ordinal(): 183;
        };
        static get SL(): geo.Country & {
            get name(): "SL";
            get ordinal(): 184;
        };
        static get SG(): geo.Country & {
            get name(): "SG";
            get ordinal(): 185;
        };
        static get SK(): geo.Country & {
            get name(): "SK";
            get ordinal(): 186;
        };
        static get SI(): geo.Country & {
            get name(): "SI";
            get ordinal(): 187;
        };
        static get SB(): geo.Country & {
            get name(): "SB";
            get ordinal(): 188;
        };
        static get SO(): geo.Country & {
            get name(): "SO";
            get ordinal(): 189;
        };
        static get ZA(): geo.Country & {
            get name(): "ZA";
            get ordinal(): 190;
        };
        static get KR(): geo.Country & {
            get name(): "KR";
            get ordinal(): 191;
        };
        static get ES(): geo.Country & {
            get name(): "ES";
            get ordinal(): 192;
        };
        static get LK(): geo.Country & {
            get name(): "LK";
            get ordinal(): 193;
        };
        static get SD(): geo.Country & {
            get name(): "SD";
            get ordinal(): 194;
        };
        static get SR(): geo.Country & {
            get name(): "SR";
            get ordinal(): 195;
        };
        static get SZ(): geo.Country & {
            get name(): "SZ";
            get ordinal(): 196;
        };
        static get SE(): geo.Country & {
            get name(): "SE";
            get ordinal(): 197;
        };
        static get CH(): geo.Country & {
            get name(): "CH";
            get ordinal(): 198;
        };
        static get SY(): geo.Country & {
            get name(): "SY";
            get ordinal(): 199;
        };
        static get TW(): geo.Country & {
            get name(): "TW";
            get ordinal(): 200;
        };
        static get TJ(): geo.Country & {
            get name(): "TJ";
            get ordinal(): 201;
        };
        static get TZ(): geo.Country & {
            get name(): "TZ";
            get ordinal(): 202;
        };
        static get TH(): geo.Country & {
            get name(): "TH";
            get ordinal(): 203;
        };
        static get TL(): geo.Country & {
            get name(): "TL";
            get ordinal(): 204;
        };
        static get TG(): geo.Country & {
            get name(): "TG";
            get ordinal(): 205;
        };
        static get TK(): geo.Country & {
            get name(): "TK";
            get ordinal(): 206;
        };
        static get TT(): geo.Country & {
            get name(): "TT";
            get ordinal(): 207;
        };
        static get TN(): geo.Country & {
            get name(): "TN";
            get ordinal(): 208;
        };
        static get TR(): geo.Country & {
            get name(): "TR";
            get ordinal(): 209;
        };
        static get TM(): geo.Country & {
            get name(): "TM";
            get ordinal(): 210;
        };
        static get TC(): geo.Country & {
            get name(): "TC";
            get ordinal(): 211;
        };
        static get TV(): geo.Country & {
            get name(): "TV";
            get ordinal(): 212;
        };
        static get UG(): geo.Country & {
            get name(): "UG";
            get ordinal(): 213;
        };
        static get UA(): geo.Country & {
            get name(): "UA";
            get ordinal(): 214;
        };
        static get AE(): geo.Country & {
            get name(): "AE";
            get ordinal(): 215;
        };
        static get GB(): geo.Country & {
            get name(): "GB";
            get ordinal(): 216;
        };
        static get US(): geo.Country & {
            get name(): "US";
            get ordinal(): 217;
        };
        static get UY(): geo.Country & {
            get name(): "UY";
            get ordinal(): 218;
        };
        static get UZ(): geo.Country & {
            get name(): "UZ";
            get ordinal(): 219;
        };
        static get VU(): geo.Country & {
            get name(): "VU";
            get ordinal(): 220;
        };
        static get VE(): geo.Country & {
            get name(): "VE";
            get ordinal(): 221;
        };
        static get VN(): geo.Country & {
            get name(): "VN";
            get ordinal(): 222;
        };
        static get WF(): geo.Country & {
            get name(): "WF";
            get ordinal(): 223;
        };
        static get YE(): geo.Country & {
            get name(): "YE";
            get ordinal(): 224;
        };
        static get ZM(): geo.Country & {
            get name(): "ZM";
            get ordinal(): 225;
        };
        static get ZW(): geo.Country & {
            get name(): "ZW";
            get ordinal(): 226;
        };
        static values(): Array<geo.Country>;
        static valueOf(value: string): geo.Country;
        get name(): "AF" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AG" | "AR" | "AM" | "AW" | "AU" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BR" | "IO" | "VG" | "VI" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "CL" | "CN" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GN" | "GW" | "GY" | "HT" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "CI" | "IR" | "IQ" | "IE" | "IL" | "IT" | "JM" | "JP" | "JO" | "KZ" | "KE" | "KI" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "KP" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PL" | "PT" | "PR" | "QA" | "XK" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "KR" | "ES" | "LK" | "SD" | "SR" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "GB" | "US" | "UY" | "UZ" | "VU" | "VE" | "VN" | "WF" | "YE" | "ZM" | "ZW";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226;
    }

    class GeoLocation {
        get lines(): kollections.List<string>;
        get country(): geo.Country;
        get cords(): Nullable<geo.LatLng>;
        get code(): Nullable<string>;
        get address(): string;
        get addressMultiline(): string;
    }

    interface LatLng {
        readonly lat: number;
        readonly lng: number;
    }

    interface LatLngAlt extends geo.LatLng {
        readonly alt: number;
        readonly lat: number;
        readonly lng: number;
    }

    function latLng(lat: number, lng: number): geo.LatLng;
    function latLngAlt(lat: number, lng: number, alt: number): geo.LatLngAlt;

    class AddressDto {
        get country(): geo.Country;
        get entries(): kollections.List<geo.Entry>;
        toLines(): kollections.List<string>;
    }

    class Entry {
        get label(): string;
        get value(): Nullable<string>;
    }

    interface AddressField extends symphony.BaseField<any/* geo.AddressOutput */> {
        readonly country: symphony.SingleChoiceField<geo.Country>;
        readonly entries: kollections.List<symphony.BaseField<string>>;
        readonly state: cinematic.Live<symphony.BaseFieldState<any/* geo.AddressOutput */>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<any>/* Nullable<geo.AddressOutput> */;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<any>/* Nullable<geo.AddressOutput> */): void;
    }

    const GoogleLocationProvider: {
    } & any/* geo.LocationProvider */;

    interface LocationField extends symphony.TransformingField<string, geo.GeoLocation> {
        readonly provider: any/* geo.LocationProvider */;
        readonly state: cinematic.Live<symphony.TransState<string, geo.GeoLocation>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<geo.GeoLocation>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        setValue(value: Nullable<string>): void;
        readonly input?: Nullable<string>;
    }
}