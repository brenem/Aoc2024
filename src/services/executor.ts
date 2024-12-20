import { Service } from 'typedi';
import { Challenge } from '../challenges/challenge';
import { ChallengeLocator } from './challenge-locator';
import { InputProvider } from './input-provider';
import { Logger } from './logger';

@Service()
export class Executor {
    constructor(
        public logger: Logger,
        public challengeLocator: ChallengeLocator,
        public inputProvider: InputProvider
    ) {}

    async run(day: number, year: number, isSampleTest: boolean, part?: number) {
        const challenge = await this.challengeLocator.findChallenge(day, year);

        if (challenge) {
            if (isSampleTest) {

                if (!part || part === 1) {
                    const part1Input = await this.inputProvider.getSample(day, 1, year);
                    await this.runPart1(challenge, part1Input);
                }

                if (!part || part === 2) {
                    const part2Input = await this.inputProvider.getSample(day, 2, year);
                    await this.runPart2(challenge, part2Input);
                }
            } else {
                const input = await this.inputProvider.getInput(day, year);

                if (!part || part === 1) {
                    await this.runPart1(challenge, input);
                }

                if (!part || part === 2) {
                    await this.runPart2(challenge, input);
                }
            }
        } else {
            this.logger.error(`No challenge found for day ${day}, year ${year}`);
        }
    }

    private async runPart1(challenge: Challenge, input: string) {
        if (!input) {
            throw new Error('No input provided for part 1');
        }

        this.logger.log('Running part 1...');

        const startTime = performance.now();
        const result = await challenge.part1(input);
        const endTime = performance.now();

        this.logger.log(`Part 1: ${result}`);
        this.logger.log(`Execution time: ${Math.round(endTime - startTime)} ms\n`);
    }

    private async runPart2(challenge: Challenge, input: string) {
        if (!input) {
            throw new Error('No input provided for part 2');
        }

        this.logger.log('Running part 2...');

        const startTime = performance.now();
        const result = await challenge.part2(input);
        const endTime = performance.now();

        this.logger.log(`Part 2: ${result}`);
        this.logger.log(`Execution time: ${Math.round(endTime - startTime)} ms\n`);
    }
}
