import { koncurrent } from './koncurrent'
import { identifier } from './identifier'
import { kash } from './kash'
import { cinematic } from './cinematic'
import { symphony } from './symphony'
import { keep } from './keep'
import { geo } from './geo'

export declare namespace sentinel.params {
    class UserAccountParams {
        get loginId(): string;
        get password(): string;
        get registrationToken(): string;
    }
}
export declare namespace sentinel.params {
    class VerificationParams {
        get email(): string;
        get token(): string;
    }
}
export declare namespace sentinel.params {
    class SignUpParams {
        get name(): string;
        get email(): string;
    }

    interface RegistrationApi {
        signUp(params: sentinel.params.SignUpParams): koncurrent.Later<sentinel.params.SignUpParams>;
        sendVerificationLink(email: string): koncurrent.Later<string>;
        verify(params: sentinel.params.VerificationParams): koncurrent.Later<sentinel.params.VerificationParams>;
        createUserAccount(params: sentinel.params.UserAccountParams): koncurrent.Later<sentinel.params.UserAccountParams>;
    }

    interface ProfileApi {
        readonly personal: identifier.PersonalProfileApi;
        readonly organisation: identifier.OrganisationProfileApi;
    }

    interface AuthenticationApi {
        signIn(params: sentinel.params.SignInParams): koncurrent.Later<sentinel.UserSession>;
        session(): koncurrent.Later<sentinel.UserSession>;
        signOut(): koncurrent.Later<void>;
        sendPasswordResetLink(email: string): koncurrent.Later<string>;
        resetPassword(params: sentinel.params.PasswordResetParams): koncurrent.Later<sentinel.params.PasswordResetParams>;
    }

    class UserSession {
        get user(): identifier.IndividualDto;
        get secret(): string;
        get company(): identifier.CorporateDto;
        get currency(): kash.Currency;
        get timezone(): string;
        get salesTax(): number;
    }
}
export declare namespace sentinel.params {
    class PasswordResetParams {
        get password(): string;
        get passwordResetToken(): Nullable<string>;
    }
}
export declare namespace sentinel.params {
    class SendPasswordResetParams {
        get email(): string;
        get url(): string;
    }
}
export declare namespace sentinel.params {
    class SignInParams {
        get email(): string;
        get password(): string;
    }

    class AuthenticationScenes {
        get signIn(): sentinel.SignInScene;
        get barrier(): sentinel.BarrierScene;
        get registration(): sentinel.RegistrationScene;
        get password(): sentinel.PasswordScenes;
    }

    class BarrierScene extends cinematic.BaseScene {
        get ui(): cinematic.MutableLive<kase.LazyState<sentinel.UserSession>>;
        initialize(onDiscard: (p0: Error) => void): koncurrent.Later<sentinel.UserSession>;
        deInitialize(): void;
    }

    class CompleteRegistration extends cinematic.BaseScene {
        get ui(): cinematic.MutableLive<kase.LazyState<sentinel.UserSession>>;
        initialize(onDiscard: (p0: Error) => void): koncurrent.Later<sentinel.UserSession>;
        deInitialize(): void;
    }

    class PasswordForgotScene extends cinematic.LazyScene<symphony.Form<any, any/* sentinel.fields.PasswordForgotOutput */, sentinel.fields.PasswordForgotFields>> {
        initialize(): void;
        resend(): Nullable<koncurrent.Later<any>>;
    }

    class PasswordResetScene extends cinematic.LazyScene<symphony.Form<any, any/* sentinel.fields.PasswordResetOutput */, sentinel.fields.PasswordResetFields>> {
        initialize(link: string, onResult: (p0: kase.Result<void>) => void): void;
        deInitialize(): void;
    }

    class PasswordScenes {
        get forgot(): sentinel.PasswordForgotScene;
        get reset(): sentinel.PasswordResetScene;
    }

    class RegistrationScene extends cinematic.LazyScene<sentinel.UserSession> {
        initialize(onSuccess: () => void): koncurrent.Later<sentinel.UserSession>;
    }

    class SignInScene extends cinematic.Scene<kase.LazyState<sentinel.UserSession>> {
        get form(): symphony.Form<sentinel.UserSession, any/* sentinel.fields.SignInFormOutput */, sentinel.fields.SignInFields>;
        initialize(onSuccess: (p0: sentinel.UserSession) => void): void;
        deInitialize(): void;
    }
}
export declare namespace sentinel.fields {
    class PasswordForgotFields extends symphony.Fields<any/* sentinel.fields.PasswordForgotOutput */> {
        get email(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class PasswordResetFields extends symphony.Fields<any/* sentinel.fields.PasswordResetOutput */> {
        get password1(): symphony.BaseField<string>;
        get password2(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class SignInFields extends symphony.Fields<any/* sentinel.fields.SignInFormOutput */> {
        get email(): symphony.BaseField<string>;
        get password(): symphony.BaseField<string>;
        get recoverText(): string;
        get signUpPromptText(): string;
        get signInText(): string;
    }

    interface RegistrationSceneConfig<A> extends keep.Cacheable/*, hormone.HasApi<A>, lexi.Logable */ {
        readonly cache: any/* keep.Cache */;
    }

    interface RegistrationScenes {
        readonly signUp: sentinel.SignUpScene;
        readonly verification: sentinel.VerificationScene;
        readonly password: sentinel.SetPasswordScene;
    }

    class SetPasswordScene {
        initialize(onSuccess: () => void): void;
        deInitialize(): void;
        get form(): symphony.Form<sentinel.params.UserAccountParams, any/* sentinel.fields.SetPasswordOutput */, sentinel.fields.SetPasswordFields>;
    }

    class SignUpScene extends cinematic.BaseScene {
        initialize(): koncurrent.Later<sentinel.fields.SignUpFields>;
        get form(): symphony.Form<string, any/* sentinel.fields.SignUpOutput */, sentinel.fields.SignUpFields>;
        resendVerificationLink(): koncurrent.Later<string>;
    }

    class VerificationScene extends cinematic.LazyScene<sentinel.params.VerificationParams> {
        initialize(link: string, onCompleted: (p0: kase.Result<sentinel.params.VerificationParams>) => void): koncurrent.Later<any>;
    }
}
export declare namespace sentinel.fields {
    class SetPasswordFields extends symphony.Fields<any/* sentinel.fields.SetPasswordOutput */> {
        get password1(): symphony.BaseField<string>;
        get password2(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class SignUpFields extends symphony.Fields<any/* sentinel.fields.SignUpOutput */> {
        get name(): symphony.BaseField<string>;
        get email(): symphony.BaseField<string>;
    }

    class BusinessInfoScene extends cinematic.LazyScene<symphony.Form<identifier.CorporatePresenter, any/* identifier.fields.CorporateOutput */, identifier.fields.CorporateFields>> {
        initialize(): void;
    }

    class BusinessLogoScene implements symphony.ImageViewerUploader {
        get state(): cinematic.Live<symphony.ImageViewerUploaderState>;
        get uploader(): Nullable<(p0: epsilon.FileBlob) => koncurrent.Later<string>>;
        edit(image: epsilon.FileBlob): void;
        upload(image: epsilon.FileBlob): koncurrent.Later<string>;
        view(url: string): void;
        initialize(): koncurrent.Later<void>;
    }

    class BusinessProfileScenes {
        get logo(): sentinel.BusinessLogoScene;
        get info(): sentinel.BusinessInfoScene;
    }

    class ChangePasswordScene extends cinematic.LazyScene<symphony.Form<identifier.IndividualDto, any/* sentinel.fields.ChangePasswordOutput */, sentinel.fields.ChangePasswordFields>> {
        initialize(): koncurrent.Later<symphony.Form<identifier.IndividualDto, any/* sentinel.fields.ChangePasswordOutput */, sentinel.fields.ChangePasswordFields>>;
    }

    class PersonalProfileInfoScene extends cinematic.LazyScene<symphony.Form<identifier.IndividualDto, any/* identifier.fields.IndividualOutput */, sentinel.fields.PersonalProfileInfoFields>> {
        initialize(): koncurrent.Later<symphony.Form<identifier.IndividualDto, any/* identifier.fields.IndividualOutput */, sentinel.fields.PersonalProfileInfoFields>>;
    }

    class PersonalProfilePictureScene implements symphony.ImageViewerUploader {
        get state(): cinematic.Live<symphony.ImageViewerUploaderState>;
        get uploader(): Nullable<(p0: epsilon.FileBlob) => koncurrent.Later<string>>;
        edit(image: epsilon.FileBlob): void;
        upload(image: epsilon.FileBlob): koncurrent.Later<string>;
        view(url: string): void;
        initialize(): koncurrent.Later<void>;
        deInitialize(): void;
    }

    class PersonalProfileScenes {
        get picture(): sentinel.PersonalProfilePictureScene;
        get info(): sentinel.PersonalProfileInfoScene;
        get security(): sentinel.ChangePasswordScene;
    }

    interface ProfileScenes {
        readonly business: sentinel.BusinessProfileScenes;
        readonly personal: sentinel.PersonalProfileScenes;
    }
}
export declare namespace sentinel.fields {
    class ChangePasswordFields extends symphony.Fields<any/* sentinel.fields.ChangePasswordOutput */> {
        get current(): symphony.BaseField<string>;
        get password1(): symphony.BaseField<string>;
        get password2(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class PersonalProfileInfoFields extends symphony.Fields<any/* identifier.fields.IndividualOutput */> {
        get name(): symphony.BaseField<string>;
    }

    abstract class AccountType {
        static get Business(): sentinel.AccountType & {
            get name(): "Business";
            get ordinal(): 0;
        };
        static get Individual(): sentinel.AccountType & {
            get name(): "Individual";
            get ordinal(): 1;
        };
        static values(): Array<sentinel.AccountType>;
        static valueOf(value: string): sentinel.AccountType;
        get name(): "Business" | "Individual";
        get ordinal(): 0 | 1;
    }

    class OnBoardingScene extends cinematic.BaseScene {
        get form(): symphony.MultiStageForm<identifier.CorporatePresenter, any/* sentinel.OnBoardingOutput */, sentinel.OnBoardingStage>;
        initialize(onComplete: (p0: kase.Result<identifier.CorporatePresenter>) => void): void;
        deInitialize(): void;
    }

    abstract class OnBoardingStage implements symphony.FormStage {
        get asAccount(): Nullable<sentinel.OnBoardingStage.Account>;
        get asBusinessName(): Nullable<sentinel.OnBoardingStage.BusinessName>;
        get asCurrency(): Nullable<sentinel.OnBoardingStage.Currency>;
        get asAddress(): Nullable<sentinel.OnBoardingStage.Address>;
        get fields(): symphony.Fields<any /*UnknownType **/>;
        get onNext(): Nullable<() => void>;
        get onPrev(): Nullable<() => void>;
        get heading(): string;
        get details(): string;
    }
    namespace OnBoardingStage {
        class Account extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.AccountTypeFields;
            get onNext(): Nullable<() => void>;
            get onPrev(): Nullable<() => void>;
        }
        class BusinessName extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.BusinessNameFields;
            get onNext(): Nullable<() => void>;
            get onPrev(): Nullable<() => void>;
        }
        class Currency extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.CurrencyFields;
            get onNext(): () => void;
            get onPrev(): Nullable<() => void>;
        }
        class Address extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.AddressFields;
            get onNext(): Nullable<() => void>;
            get onPrev(): Nullable<() => void>;
        }
    }
}
export declare namespace sentinel.fields {
    class AccountTypeFields extends symphony.Fields<any/* sentinel.fields.AccountTypeOutput */> {
        get type(): symphony.SingleChoiceField<sentinel.AccountType>;
    }
}
export declare namespace sentinel.fields {
    class AddressFields extends symphony.Fields<any/* sentinel.fields.OnboardingAddressOutput */> {
        get address(): geo.AddressField;
    }
}
export declare namespace sentinel.fields {
    class BusinessNameFields extends symphony.Fields<any/* sentinel.fields.BusinessNameOutput */> {
        get name(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class CurrencyFields extends symphony.Fields<any/* sentinel.fields.CurrencyOutput */> {
        get currency(): symphony.SingleChoiceField<geo.Country>;
    }
}
export declare namespace sentinel.fields {
    class LocationFields extends symphony.Fields<any/* sentinel.fields.LocationOutput */> {
        get location(): geo.LocationField;
    }
}
export declare namespace sentinel.params {
    class AccountTypeOnBoardingParams {
        get type(): Nullable<sentinel.AccountType>;
        set type(value: Nullable<sentinel.AccountType>);
    }
}
export declare namespace sentinel.params {
    class BusinessNameOnBoardingParams {
        get name(): Nullable<string>;
        set name(value: Nullable<string>);
    }
}
export declare namespace sentinel.params {
    class CurrencyOnBoardingParams {
        get currency(): Nullable<kash.Currency>;
        set currency(value: Nullable<kash.Currency>);
        get country(): Nullable<geo.Country>;
    }
}
export declare namespace sentinel.params {
    class LocationOnBoardingParams {
        get location(): Nullable<geo.GeoLocation>;
        set location(value: Nullable<geo.GeoLocation>);
    }
}