import { sentinel } from './sentinel'
import { snitch } from './snitch'
import { bringer } from './bringer'
import { krono } from './krono'

export declare namespace picapital {
    interface PiCapitalApi {
        readonly authentication: sentinel.AuthenticationApi;
        readonly registration: sentinel.RegistrationApi;
    }

    class PiCapitalAppScenes {
        get api(): picapital.PiCapitalApi;
        get registration(): sentinel.RegistrationScenes;
        get authentication(): sentinel.AuthenticationScenes;
        get toaster(): snitch.Snitch;
        get downloader(): bringer.Downloader;
    }

    class PiCapitalAppScenesConfig<A> implements sentinel.RegistrationSceneConfig<A>, keep.Cacheable/*, sentinel.AuthenticationScenesConfig<A>, sentinel.OnboardingScenesConfig<A>, sentinel.ProfileScenesConfig<A> */ {
        get cache(): any/* keep.Cache */;
        get clock(): krono.Clock;
        get workManager(): any/* krest.WorkManager */;
        get downloader(): bringer.Downloader;
        get clipboard(): any/* klip.Clipboard */;
    }
}