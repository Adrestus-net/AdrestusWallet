import mnemonic from "../crypto/Mnemonic"

test('generate12WordMnemonic', () => {
    expect(new mnemonic(128).create().length).toBe(12);
});

test('generate24WordMnemonic', () => {
    expect(new mnemonic(256).create().length).toBe(24);
});

test('seedCreate', () => {
    let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
    let passphrase = "p4ssphr4se"
    expect(new mnemonic(256).createSeed(mnemonic_array,passphrase)).toBe("7ef4d90003820f31429d26a4d4f0611c9c421c09d4fad148a6173cd31192d9912d2e92568cba04e3b4e0d580ee8ac806b7fcc1a4dae70418f51566234136be1c1d81ff8267c03ce204e899a0006eb70d4f94296044bf1461984481a6332564290aedb394797777dc558253990e50afb6fe6d5123e94909fc4010acb8bf52f5b7b25d29f6fdeca88f039523d15e35f00c6b23e21d30a92dec855496981eefd8e277dca830a28b6e5dcc2915c0f95fbcccc5247c2274cf8fd270ccb19eb3ddc5313e5f04c6e72590e4304d62a6217a6b929be5460701f0b8f6d0d2bfd766a5cb5ceaeb50a2589412f05fe3799244c19d10967a56ef29cc6f6b04cf444d538e2ba5b71a9ef746f7d576461b7aa42ae61ff7b1fe2f891247f4eaafb31d6f6ce743a83ed18f41a27e3cbd6a2cd98aafa2d07a3e832bb1549bd7d39cacf1981c9bd3ee62cd73e446b957762fa31d469ee21b3a7d479ffaa01d54bc67d9d30da791e3e367b5985da7502095ffba08dd442e19bb850bb0b5ea056c1d30642e652c10729ff3e5e742ee7c886ca857fde80432f0bb61c36df862a3aa73e85bff2e0e6dd6105755f467f663a7d25ddb5c95b0858a9539f23cc2ee98935fade025fa5cd6059f2f51f09a856d8950752036d9461ccb1f8272cdbe9dd4ea369453bffcf46743940a0f938382f760e852bc3ceaaa96f43b86fafcdc96709fdd9309bf847149bb0e");
});