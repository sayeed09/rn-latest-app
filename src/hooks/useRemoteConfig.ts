// import remoteConfig from "@react-native-firebase/remote-config";
import { useAuthDispatch } from "@context/auth";
import { useSearchDispatch } from "@context/search";
import { useShopDispatch } from "@context/shop";
import { useEffect } from "react";

export const useRemoteConfig = (onForceUpdateChange: (value: boolean) => void) => {
    const searchDispatch = useSearchDispatch();
    const authDispatch = useAuthDispatch();
    const shopDispatch = useShopDispatch();

    useEffect(() => {
        // const initRemoteConfig = async () => {
        //     try {
        //         await remoteConfig().setDefaults({
        //             force_update_required: '{}',
        //             search_api_parameters: '{}',
        //             shiprocket_login_enabled: '{}',
        //             product_config: '[]',
        //         });

        //         await remoteConfig().setConfigSettings({
        //             minimumFetchIntervalMillis: 1800000, // 30 mins
        //         });

        //         await remoteConfig().fetchAndActivate();

        //         // Force Update
        //         const appUpdates = remoteConfig().getValue("force_update_required");
        //         onForceUpdateChange(appUpdates.asBoolean());

        //         // Search Params
        //         const searchParameters = remoteConfig().getValue("search_api_parameters").asString();
        //         const parsedSearchParams = JSON.parse(searchParameters)
        //         let searchPayload: searchInterface = {
        //             "x-store-id": parsedSearchParams["x-store-id"],
        //             "x-api-key": parsedSearchParams["x-api-key"],
        //             sort: parsedSearchParams["sort"]
        //         }
        //         searchDispatch(setSearchParams(searchPayload));
        //         // ValueCommunication Params
        //         const valueComms = remoteConfig().getValue("product_config").asString();
        //         shopDispatch(setValueComms(JSON.parse(valueComms).value_comms));

        //         // ShipRocket
        //         const shipRocketEnabled = remoteConfig().getValue("shiprocket_login_enabled");
        //         authDispatch(setShipRocketEnabled(shipRocketEnabled.asBoolean()));
        //     } catch (err) {
        //         // Use fallback values in case of error
        //         // force show shiprocket login in case remote config fails
        //         const parsedSearchParams = JSON.parse(JSON.stringify(fallbackForSearchParams))
        //         let searchPayload: searchInterface = {
        //             "x-store-id": parsedSearchParams["x-store-id"],
        //             "x-api-key": parsedSearchParams["x-api-key"],
        //             sort: parsedSearchParams["sort"]
        //         }
        //         searchDispatch(setSearchParams(searchPayload)); console.log("remote config initialize failed", err);
        //     }
        // };

        // initRemoteConfig();
    }, [authDispatch, searchDispatch, shopDispatch, onForceUpdateChange]);
};