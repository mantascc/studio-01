const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];
new vm.Script(script);
const core = script.split('const canvas=')[0];
const checks = `
let current=origin(),minSpread=1,seen=new Set();
for(let gen=1;gen<=10000;gen++){
 const copy=current.slice(), result=nextState(current,gen);
 assert.deepEqual(nextState(current,gen),result);
 assert.deepEqual(current,copy);
 assert.equal(result.cells.length,SAMPLE_COUNT);
 assert.equal(result.rule,(gen-1)%RULES.length);
 let changed=0;
 for(let i=0;i<SAMPLE_COUNT;i++){
  assert.ok(result.cells[i]>=.42&&result.cells[i]<=.98);
  if((i-result.start+SAMPLE_COUNT)%SAMPLE_COUNT>=MUTATION_COUNT)assert.equal(result.cells[i],current[i]);
  if(result.cells[i]!==current[i])changed++;
 }
 assert.ok(changed<=MUTATION_COUNT);assert.ok(changed>0);
 const fingerprint=result.cells.map(x=>x.toFixed(6)).join(',');
 assert.ok(!seen.has(fingerprint));seen.add(fingerprint);
 const spread=Math.max(...result.cells)-Math.min(...result.cells);minSpread=Math.min(minSpread,spread);
 current=result.cells;
}
assert.ok(minSpread>.08);
for(let n=0;n<1000;n++)advance();
assert.equal(state.ancestors.length,MEMORY);
assert.equal(state.generation,1000);
console.log('10,000 generations passed: deterministic, one rule, exactly 140 protected samples, <=20 mutations, bounded, no repeated states at 1e-6, minimum radial spread '+minSpread.toFixed(3)+'. History bounded at five after 1,000 steps.');
`;
vm.runInNewContext(core + checks, {assert, console});
