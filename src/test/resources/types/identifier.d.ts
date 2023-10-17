import { kollections } from './kollections'
import { hormone } from './hormone'
import { koncurrent } from './koncurrent'
import { symphony } from './symphony'
import { geo } from './geo'
import { krono } from './krono'
import { cinematic } from './cinematic'

export declare namespace identifier {
    interface Deletable {
        readonly deleted: boolean;
    }

    class Name /* implements kotlin.CharSequence */ {
        get value(): string;
        get full(): string;
        get first(): string;
        get middle(): string;
        get last(): string;
        get firstLast(): string;
        randomized(): identifier.Name;
    }

    interface Named {
        readonly name: string;
    }

    class Password /* implements kotlin.CharSequence */ {
        get value(): string;
        static from(value: any): identifier.Password;
        get clearText(): string;
    }

    const UNSET: string;

    interface Unique {
        readonly uid: string;
    }

    interface Comm {
        readonly verified: boolean;
        readonly userId: string;
        readonly value: string;
    }

    interface Email extends identifier.Comm {
        readonly parts: Array<string>;
        readonly identity: string;
        readonly domain: string;
        readonly verified: boolean;
        readonly userId: string;
        readonly value: string;
    }

    interface Phone extends identifier.Comm {
        readonly verified: boolean;
        readonly userId: string;
        readonly value: string;
    }

    class UserEmail implements identifier.Comm {
        get value(): string;
        get userId(): string;
        get verified(): boolean;
        asPrimitiveEmail(): identifier.Email;
    }

    class UserPhone implements identifier.Comm {
        get value(): string;
        get userId(): string;
        get verified(): boolean;
        get whatsapp(): boolean;
        asPrimitivePhone(): identifier.Phone;
    }

    class ContactDto {
        get uid(): string;
        get name(): string;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get role(): Nullable<string>;
        get isPrimary(): boolean;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }

    class CorporateBranchDto {
        get name(): string;
        get contacts(): any/* kotlin.collections.List<identifier.ContactDto> */;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }

    class CorporateDto extends identifier.LegalEntityDto {
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get headQuarters(): identifier.CorporateBranchDto;
        get branches(): any/* kotlin.collections.List<identifier.CorporateBranchDto> */;
        get registrationNo(): Nullable<string>;
        get registrationDate(): Nullable<krono.LocalDate>;
        get taxPayerIdentificationNo(): Nullable<string>;
        get vatNo(): Nullable<string>;
        get website(): Nullable<string>;
        get industry(): Nullable<identifier.Industry>;
        get gid(): string;
        get type(): identifier.CorporateType;
    }

    abstract class CorporateType {
        get label(): string;
        static get NGO(): identifier.CorporateType & {
            get name(): "NGO";
            get ordinal(): 0;
        };
        static get COMPANY(): identifier.CorporateType & {
            get name(): "COMPANY";
            get ordinal(): 1;
        };
        static get GOVERNMENT_INSTITUTION(): identifier.CorporateType & {
            get name(): "GOVERNMENT_INSTITUTION";
            get ordinal(): 2;
        };
        static values(): Array<identifier.CorporateType>;
        static valueOf(value: string): identifier.CorporateType;
        get name(): "NGO" | "COMPANY" | "GOVERNMENT_INSTITUTION";
        get ordinal(): 0 | 1 | 2;
    }

    abstract class DocumentType {
        get label(): string;
        static get PASSPORT(): identifier.DocumentType & {
            get name(): "PASSPORT";
            get ordinal(): 0;
        };
        static get DRIVING_LICENSE(): identifier.DocumentType & {
            get name(): "DRIVING_LICENSE";
            get ordinal(): 1;
        };
        static get VOTERS_CARD(): identifier.DocumentType & {
            get name(): "VOTERS_CARD";
            get ordinal(): 2;
        };
        static get NATIONAL_ID(): identifier.DocumentType & {
            get name(): "NATIONAL_ID";
            get ordinal(): 3;
        };
        static get UNKNOWN(): identifier.DocumentType & {
            get name(): "UNKNOWN";
            get ordinal(): 4;
        };
        static get CLUB_CARD(): identifier.DocumentType & {
            get name(): "CLUB_CARD";
            get ordinal(): 5;
        };
        static get STUDENT_CARD(): identifier.DocumentType & {
            get name(): "STUDENT_CARD";
            get ordinal(): 6;
        };
        static values(): Array<identifier.DocumentType>;
        static valueOf(value: string): identifier.DocumentType;
        get name(): "PASSPORT" | "DRIVING_LICENSE" | "VOTERS_CARD" | "NATIONAL_ID" | "UNKNOWN" | "CLUB_CARD" | "STUDENT_CARD";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
    }

    abstract class Gender {
        static get Male(): identifier.Gender & {
            get name(): "Male";
            get ordinal(): 0;
        };
        static get Female(): identifier.Gender & {
            get name(): "Female";
            get ordinal(): 1;
        };
        static values(): Array<identifier.Gender>;
        static valueOf(value: string): identifier.Gender;
        get name(): "Male" | "Female";
        get ordinal(): 0 | 1;
    }

    class IndividualDto extends identifier.LegalEntityDto {
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get gid(): string;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }

    abstract class Industry {
        get label(): string;
        static get AUTOMOTIVE(): identifier.Industry & {
            get name(): "AUTOMOTIVE";
            get ordinal(): 0;
        };
        static get BASIC_MATERIALS(): identifier.Industry & {
            get name(): "BASIC_MATERIALS";
            get ordinal(): 1;
        };
        static get BEAUTY_PRODUCTS(): identifier.Industry & {
            get name(): "BEAUTY_PRODUCTS";
            get ordinal(): 2;
        };
        static get CONSUMER_GOODS(): identifier.Industry & {
            get name(): "CONSUMER_GOODS";
            get ordinal(): 3;
        };
        static get CONSTRUCTION(): identifier.Industry & {
            get name(): "CONSTRUCTION";
            get ordinal(): 4;
        };
        static get CONSUMER_SERVICES(): identifier.Industry & {
            get name(): "CONSUMER_SERVICES";
            get ordinal(): 5;
        };
        static get EDUCATION(): identifier.Industry & {
            get name(): "EDUCATION";
            get ordinal(): 6;
        };
        static get ENERGY(): identifier.Industry & {
            get name(): "ENERGY";
            get ordinal(): 7;
        };
        static get ENTERTAINMENT(): identifier.Industry & {
            get name(): "ENTERTAINMENT";
            get ordinal(): 8;
        };
        static get FASHION(): identifier.Industry & {
            get name(): "FASHION";
            get ordinal(): 9;
        };
        static get FINANCIAL_SERVICES(): identifier.Industry & {
            get name(): "FINANCIAL_SERVICES";
            get ordinal(): 10;
        };
        static get FOOD_AND_BEVERAGE(): identifier.Industry & {
            get name(): "FOOD_AND_BEVERAGE";
            get ordinal(): 11;
        };
        static get HEALTH_CARE(): identifier.Industry & {
            get name(): "HEALTH_CARE";
            get ordinal(): 12;
        };
        static get INDUSTRIALS(): identifier.Industry & {
            get name(): "INDUSTRIALS";
            get ordinal(): 13;
        };
        static get MANUFACTURING(): identifier.Industry & {
            get name(): "MANUFACTURING";
            get ordinal(): 14;
        };
        static get OIL_AND_GAS(): identifier.Industry & {
            get name(): "OIL_AND_GAS";
            get ordinal(): 15;
        };
        static get PROFESSIONAL_SERVICES(): identifier.Industry & {
            get name(): "PROFESSIONAL_SERVICES";
            get ordinal(): 16;
        };
        static get TECHNOLOGY(): identifier.Industry & {
            get name(): "TECHNOLOGY";
            get ordinal(): 17;
        };
        static get TOURISM(): identifier.Industry & {
            get name(): "TOURISM";
            get ordinal(): 18;
        };
        static get TELECOMMUNICATIONS(): identifier.Industry & {
            get name(): "TELECOMMUNICATIONS";
            get ordinal(): 19;
        };
        static get UTILITIES(): identifier.Industry & {
            get name(): "UTILITIES";
            get ordinal(): 20;
        };
        static values(): Array<identifier.Industry>;
        static valueOf(value: string): identifier.Industry;
        get name(): "AUTOMOTIVE" | "BASIC_MATERIALS" | "BEAUTY_PRODUCTS" | "CONSUMER_GOODS" | "CONSTRUCTION" | "CONSUMER_SERVICES" | "EDUCATION" | "ENERGY" | "ENTERTAINMENT" | "FASHION" | "FINANCIAL_SERVICES" | "FOOD_AND_BEVERAGE" | "HEALTH_CARE" | "INDUSTRIALS" | "MANUFACTURING" | "OIL_AND_GAS" | "PROFESSIONAL_SERVICES" | "TECHNOLOGY" | "TOURISM" | "TELECOMMUNICATIONS" | "UTILITIES";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
    }

    interface LegalEntityApi extends hormone.Deleter<identifier.LegalEntityDto>, hormone.Loader<identifier.LegalEntityDto> {
        delete(uid: string): koncurrent.Later<Nullable<identifier.LegalEntityDto>>;
        deleteBulk(ids: kollections.List<string>): koncurrent.Later<kollections.List<Nullable<identifier.LegalEntityDto>>>;
        load(options: any/* kronecker.LoadOptions */): koncurrent.Later<kollections.List<identifier.LegalEntityDto>>;
        loadById(uid: string): koncurrent.Later<identifier.LegalEntityDto>;
    }

    abstract class LegalEntityDto {
        get uid(): string;
        get gid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get asIndividual(): Nullable<identifier.IndividualDto>;
        get asCorporate(): Nullable<identifier.CorporateDto>;
        get loc(): Nullable<geo.GeoLocation>;
    }

    interface OrganisationProfileApi {
        update(params: identifier.params.CorporateParams): koncurrent.Later<identifier.CorporateDto>;
        updateLogo(logo: epsilon.Blob): koncurrent.Later<identifier.CorporateDto>;
        updateCurrency(currency: kash.Currency): koncurrent.Later<kash.Currency>;
        updateTimezone(tz: string): koncurrent.Later<string>;
        updateSalesTax(percentage: number): koncurrent.Later<number>;
    }

    interface PersonalProfileApi {
        changeProfilePicture(file: epsilon.Blob): koncurrent.Later<identifier.IndividualDto>;
        changePassword(params: any/* identifier.params.PasswordParams */): koncurrent.Later<identifier.IndividualDto>;
        update(params: identifier.params.IndividualProfileParams): koncurrent.Later<identifier.IndividualDto>;
        addEmail(email: string): koncurrent.Later<identifier.IndividualDto>;
        beginEmailVerificationProcess(email: string): koncurrent.Later<string>;
        completeEmailVerificationProcess(token: string): koncurrent.Later<string>;
        deleteEmail(email: string): koncurrent.Later<identifier.IndividualDto>;
        beginPhoneVerificationProcess(phone: string): koncurrent.Later<string>;
        completePhoneVerificationProcess(phone: string): koncurrent.Later<string>;
        addPhone(phone: string): koncurrent.Later<identifier.IndividualDto>;
        deletePhone(phone: string): koncurrent.Later<identifier.IndividualDto>;
    }
}
export declare namespace identifier.params {
    class ContactParams {
        get name(): string;
        get role(): Nullable<string>;
        get email(): Nullable<string>;
        get phone(): Nullable<string>;
    }
}
export declare namespace identifier.params {
    class CorporateParams {
        get name(): string;
        get contactName(): Nullable<string>;
        get contactEmail(): Nullable<string>;
        get contactPhone(): Nullable<string>;
        get contactRole(): Nullable<string>;
        get industry(): Nullable<identifier.Industry>;
        get registrationNo(): Nullable<string>;
        get registrationDate(): Nullable<krono.LocalDate>;
        get tin(): Nullable<string>;
        get vat(): Nullable<string>;
        get website(): Nullable<string>;
        get hqLocation(): Nullable<geo.GeoLocation>;
        get address(): Nullable<geo.AddressDto>;
        get businessType(): Nullable<identifier.CorporateType>;
    }
}
export declare namespace identifier.params {
    class IndividualParams {
        get name(): string;
        get email(): Nullable<string>;
        get phone(): Nullable<string>;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }
}
export declare namespace identifier.params {
    class IndividualProfileParams {
        get name(): string;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }

    class ContactPresenter {
        get src(): identifier.ContactDto;
        get uid(): string;
        get name(): string;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get role(): Nullable<string>;
        get isPrimary(): boolean;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }

    class CorporateBranchPresenter {
        get src(): identifier.CorporateBranchDto;
        get name(): string;
        get contacts(): any/* kotlin.collections.List<identifier.ContactPresenter> */;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }

    class CorporatePresenter extends identifier.LegalEntityPresenter {
        get src(): identifier.CorporateDto;
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get headQuarters(): identifier.CorporateBranchPresenter;
        get branches(): any/* kotlin.collections.List<identifier.CorporateBranchPresenter> */;
        get registrationNo(): Nullable<string>;
        get registrationDate(): Nullable<krono.LocalDate>;
        get taxPayerIdentificationNo(): Nullable<string>;
        get vatNo(): Nullable<string>;
        get website(): Nullable<string>;
        get industry(): Nullable<identifier.Industry>;
        get gid(): string;
        get type(): identifier.CorporateType;
    }

    class IndividualPresenter extends identifier.LegalEntityPresenter {
        get src(): identifier.IndividualDto;
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get gid(): string;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }

    abstract class LegalEntityPresenter {
        get src(): identifier.LegalEntityDto;
        get uid(): string;
        get gid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get asIndividual(): Nullable<identifier.IndividualPresenter>;
        get asCorporate(): Nullable<identifier.CorporatePresenter>;
        get loc(): Nullable<geo.GeoLocation>;
    }
}
export declare namespace identifier.fields {
    class CorporateFields extends identifier.fields.LegalEntityFields<any/* identifier.fields.CorporateOutput */> {
        get entity(): Nullable<identifier.CorporatePresenter>;
        get name(): symphony.BaseField<string>;
        get industry(): symphony.SingleChoiceField<identifier.Industry>;
        get businessType(): symphony.SingleChoiceField<identifier.CorporateType>;
        get headquarters(): geo.LocationField;
        get address(): symphony.BaseField<string>;
        get registrationNo(): symphony.BaseField<string>;
        get registrationDate(): krono.LocalDateField;
        get tin(): symphony.BaseField<string>;
        get vat(): symphony.BaseField<string>;
        get website(): symphony.BaseField<string>;
        get contactName(): symphony.BaseField<string>;
        get contactEmail(): symphony.BaseField<string>;
        get contactPhone(): symphony.PhoneField;
        get numberOfEmployees(): symphony.NumberField<number>;
        get contactRole(): symphony.SingleChoiceField<string>;
        get contactTitle(): symphony.SingleChoiceField<string>;
    }
}
export declare namespace identifier.fields {
    class IndividualFields extends identifier.fields.LegalEntityFields<any/* identifier.fields.IndividualOutput */> {
        get entity(): Nullable<identifier.IndividualPresenter>;
        get name(): symphony.BaseField<string>;
        get title(): symphony.SingleChoiceField<string>;
        get email(): symphony.BaseField<string>;
        get phone(): symphony.PhoneField;
        get dob(): krono.LocalDateField;
        get location(): geo.LocationField;
        get address(): symphony.BaseField<string>;
        get idNumber(): symphony.BaseField<string>;
        get gender(): symphony.SingleChoiceField<identifier.Gender>;
        get idType(): symphony.SingleChoiceField<identifier.DocumentType>;
    }
}
export declare namespace identifier.fields {
    abstract class LegalEntityFields<O extends any> extends symphony.Fields<O> {
        get entity(): Nullable<identifier.LegalEntityPresenter>;
        get asIndividual(): Nullable<identifier.fields.IndividualFields>;
        get asCorporate(): Nullable<identifier.fields.CorporateFields>;
    }
}
export declare namespace identifier.forms {
    abstract class LegalEntityFormScene extends cinematic.LazyScene<symphony.Form<identifier.LegalEntityPresenter, any /*UnknownType **/, identifier.fields.LegalEntityFields<any /*UnknownType **/>>> {
        get api(): hormone.Loader<identifier.LegalEntityDto>;
        get original(): Nullable<any>/* Nullable<identifier.IdentifierSettings<Nullable<identifier.LegalEntityPresenter>>> */;
        set original(value: Nullable<any>/* Nullable<identifier.IdentifierSettings<Nullable<identifier.LegalEntityPresenter>>> */);
        switchToCorporateForm(): void;
        switchToIndividualForm(): void;
        deInitialize(): void;
        individualForm(country: geo.Country, customer?: Nullable<identifier.IndividualPresenter>): symphony.Form<identifier.LegalEntityPresenter, any /*UnknownType **/, identifier.fields.IndividualFields>;
        corporateForm(country: geo.Country, customer?: Nullable<identifier.CorporatePresenter>): symphony.Form<identifier.LegalEntityPresenter, any /*UnknownType **/, identifier.fields.CorporateFields>;
    }
}