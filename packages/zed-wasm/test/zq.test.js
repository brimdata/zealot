const assert = chai.assert;

describe('zq', () => {
  it('input is string', async () => {
    const input = '1 2 3';
    const zed = await zq({ input, program: 'this + 1' });
    const resp = zed.map((z) => z.toJS());
    assert.deepEqual(resp, [2, 3, 4]);
  });

  it('input is file', async () => {
    const input = new File(['1 2 3'], 'file.json');
    const zed = await zq({ input, program: 'this + 1' });
    const resp = zed.map((z) => z.toJS());
    assert.deepEqual(resp, [2, 3, 4]);
  });

  it('input is blob', async () => {
    const input = new Blob(['1 2 3']);
    const zed = await zq({ input, program: 'this + 1' });
    const resp = zed.map((z) => z.toJS());
    assert.deepEqual(resp, [2, 3, 4]);
  });

  it('input is readable stream', async () => {
    const input = new Blob(['1 2 3']).stream();
    const zed = await zq({ input, program: 'this + 1' });
    const resp = zed.map((z) => z.toJS());
    assert.deepEqual(resp, [2, 3, 4]);
  });

  it('input is a fetch', async () => {
    const input = await fetch('./package.json');
    const zed = await zq({ input, program: 'yield name' });
    const resp = zed.map((z) => z.toJS());
    assert.deepEqual(resp, ['@brimdata/zed-wasm']);
  });

  it('input is an array of JS objects', async () => {
    const input = [1, 2, 3];
    const zed = await zq({ input, program: 'this + 1' });
    const resp = zed.map((z) => z.toJS());
    assert.deepEqual(resp, [2, 3, 4]);
  });
});
