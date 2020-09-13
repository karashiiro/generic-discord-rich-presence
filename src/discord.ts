import { Http } from "./service";

import mem from "mem";

export const getApplicationIcon = mem(_getApplicationIcon);

async function _getApplicationIcon(
	applicationId: string,
): Promise<[largeImageKey: string | null, smallImageKey: string | null]> {
	const assets: ApplicationAsset[] = (
		await Http.get(`https://discordapp.com/api/oauth2/applications/${applicationId}/assets`)
	).body as any[];
	try {
		return [
			assets.find((asset) => asset.name === "large")?.name || null,
			assets.find((asset) => asset.name === "small")?.name || null,
		];
	} catch {
		return [null, null];
	}
}

interface ApplicationAsset {
	id: string;
	type: number;
	name: string;
}

export interface AccountConnection {
	friend_sync: boolean;
	id: string;
	integrations: any[];
	name: string;
	revoked: boolean;
	show_activity: boolean;
	type: string; // enum but lazy
	verified: boolean;
	visibility: number;
}

export type GetAllConnections = () => Promise<AccountConnection[]>;