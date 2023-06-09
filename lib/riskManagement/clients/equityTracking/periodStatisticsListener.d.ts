import {PeriodStatistics} from './equityTracking.client';

/**
 * Period statistics event listener for handling a stream of period statistics events
 */
export default class PeriodStatisticsListener {

  /**
   * Processes period statistics event which occurs when new period statistics data arrives
   * @param {PeriodStatistics[]} periodStatisticsEvent period statistics event
   */
  onPeriodStatisticsUpdated(periodStatisticsEvent: PeriodStatistics[]): Promise<void>;

  /**
   * Processes period statistics event which occurs when a statistics period ends
   */
  onPeriodStatisticsCompleted(): Promise<void>;

  /**
   * Processes an event which occurs when connection has been established
   * @param {string} instanceIndex connection instance index
   */
  onConnected(instanceIndex: string): Promise<void>;
 
  /**
   * Processes an event which occurs when connection has been lost
   * @param {string} instanceIndex connection instance index
   */
  onDisconnected(instanceIndex: string): Promise<void>;

  /**
   * Processes an error event
   * @param {Error} error error received 
   */
  onError(error: Error): Promise<void>;

}
