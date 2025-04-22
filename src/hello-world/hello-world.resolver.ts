import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: 'Hello', description: 'My first resolver' })
  helloWorld(): string {
    return 'Hola mundo';
  }

  @Query(() => Float, {
    name: 'RandomNumber',
    description: 'Returns a random number',
  })
  randomNumber(): number {
    const randomNumber = Math.floor(Math.random() * 100);
    return randomNumber;
  }

  @Query(() => Int, { name: 'randomZeroToTen' })
  getRandomFromZeroTo(
    @Args('base', { type: () => Int, defaultValue: 6, nullable: true })
    base: number,
  ): number {
    return Math.floor(Math.random() * base);
  }
}
