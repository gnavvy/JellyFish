import pandas as pd
pd.set_option('display.width', 210)
pd.set_option('display.max_rows', 50)

df = pd.read_csv('hel_pro_rel_2183.data', sep=';', skiprows=3)
# df = df.iloc[:, :]
print(df)
df.to_csv('hel_pro_rel_2183.csv', float_format='%.8f', index=True)
