import json

def number_to_moo(number, word=''):
    if number > 1:
        if number % 2 == 1:
            word += 'm'
        elif number % 2 == 0:
            word += 'o'
        return number_to_moo(number // 2, word)
    else:
        return word

def create_moo_dict(moodict, i, j):
    while j < len(data):
        word = number_to_moo(i)
        if word[0] != 'o' and word[-2:] != 'mo' and word[-1] != 'm' and 'mom' not in word:
            moodict[data[j]] = word
            j += 1
        i += 1
    return(moodict)


if __name__=='__main__':
    with open('english_dictionary.json') as json_file:
        data = json.load(json_file)

    data = sorted(data.keys(), key=len, reverse=False) # As if you're actually assessing my code right now...
    moo_dict = create_moo_dict({}, 2, 0)

    with open('moo_translate.json', 'w') as out:
        json.dump(moo_dict, out)







# print(len(sorted(data.keys(), key=len, reverse=True))) # 102217 words