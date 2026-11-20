# Task 3: Görsel Prompt Benchmark

Bu hafta sadece görsel kısmını yaptım (3 fotoğraf modeli). Metin modelleri ve video kısmını yapmadım.

## Prompt (3 modele de aynen verildi, yeni sohbet, ilk sonuç)

> A rainy evening at a ferry pier in Istanbul. In the foreground, a university student holds a red umbrella and a plain notebook with a blank cover, no text anywhere. Behind them, a ferry with warm lit windows and the Galata Tower on the skyline. Realistic photograph, warm street lamp light, wet reflections on the ground, 16:9.

## Puanlama ölçütü (önceden yazdım, her biri 1-5)

- **Sadakat:** kırmızı şemsiye, vapur, Galata Kulesi, yağmur ve ıslak zemin yansıması var mı?
- **Yazı:** prompt'ta "no text anywhere" dedim, defterin ya da başka bir yerin üstünde yazı çıkmış mı?
- **Yüz/detay:** yüz ve eller doğal mı, görüntü gerçekçi bir fotoğraf gibi mi?
- **Hareket ve tutarlılık:** bunlar video için, video yapmadığım için puanlamadım.

Aynı oran: üç modelde de 16:9 çıktı.

## Sonuçlar

| Model | Sadakat | Yazı | Yüz/detay | Hareket | Tutarlılık | Toplam /15 |
|---|---|---|---|---|---|---|
| Gemini | 5 | 5 | 5 | - | - | **15** |
| ChatGPT | 4 | 5 | 4 | - | - | **13** |
| Claude | 2 | 5 | 2 | - | - | **9** |

Toplam sadakat, yazı ve yüz/detayın toplamı. Hareket ve tutarlılık video olmadığı için boş.

**ChatGPT** ![ChatGPT](gorseller/chatgpt.jpg)

**Gemini** ![Gemini](gorseller/gemini.jpg)

**Claude** ![Claude](gorseller/claude.jpg)

## Yorum

Üç modele de aynı prompt'u verdim. Bence en iyisi Gemini oldu, çünkü gerçekten çekilmiş bir fotoğraf gibiydi: yağmurdaki ışıklar, ıslak zemin ve kişinin duruşu daha doğaldı, prompt'taki "gerçekçi fotoğraf" isteğine en yakın olan oydu. Küçük eksikleri vardı, Galata Kulesi küçük kaldı ve şemsiye kadrajdan taştı. ChatGPT de çok iyiydi, kırmızı şemsiye, vapur, Galata Kulesi ve yağmur hepsi vardı, ama bana fazla parlak ve sinematik, yani biraz yapay göründü. Claude'un çıktısı en kötüsüydü, çünkü fotoğraf yerine düz bir çizim yaptı, kule Galata'ya değil de fenere benziyordu ve kişinin yüzü yoktu. Üçünde de defterin üstüne yazı koymadılar, bu kısmı hepsi doğru yaptı. Beni şaşırtan şey Claude'un bir görsel modeli olmaması, çizimi muhtemelen kodla yaptı. O yüzden fotoğraf testinde adil bir karşılaştırma olmadı.
