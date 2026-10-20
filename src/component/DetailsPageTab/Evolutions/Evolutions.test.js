import { evolutionStages } from './Evolutions';

const node = (name, id, evolves_to = []) => ({
    species: { name, url: `https://pokeapi.co/api/v2/pokemon-species/${id}/` },
    evolves_to,
});

test('keeps every branch of a split evolution (Oddish line)', () => {
    const chain = node('oddish', 43, [node('gloom', 44, [node('vileplume', 45), node('bellossom', 182)])]);
    expect(evolutionStages(chain)).toEqual([
        [{ name: 'oddish', id: '43' }],
        [{ name: 'gloom', id: '44' }],
        [{ name: 'vileplume', id: '45' }, { name: 'bellossom', id: '182' }],
    ]);
});

test('two-stage and single-stage chains have no empty stages', () => {
    expect(evolutionStages(node('pikachu', 25, [node('raichu', 26)]))).toHaveLength(2);
    expect(evolutionStages(node('tauros', 128))).toEqual([[{ name: 'tauros', id: '128' }]]);
});
