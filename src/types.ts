export interface AutoRepeatConfig {
    cmdPrefix: string;
    enableAll: boolean;
    enableGroups: number[];
    triggerCount: number;
}

export type EventHandler = () => void;
