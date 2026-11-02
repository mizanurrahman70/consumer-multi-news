# Multiply News — How to Update the Website

A short guide for editors. Everything on the website is changed from the
admin panel. You never need to touch code.

---

## 1. Log in

1. Open the admin panel: **http://localhost:1337/admin** *(your live address will be given to you)*
2. Enter your email and password.
3. Click **Content Manager** in the left menu. All website content is here.

---

## 2. The 3 golden rules

1. **Paste the normal link** of a video, for example `https://www.youtube.com/watch?v=DK_KlOVJ9hE`.
   Copy it from the browser address bar or the **Share → Copy link** button.
   **Never** paste "embed code" (text starting with `<iframe`).
2. **Click "Publish"** after saving. Only published content shows on the website.
3. **Wait a few seconds**, then refresh the website. Your change will be there.

---

## 3. Common tasks

### Add a new YouTube video (Latest Videos)
**Content Manager → Video → Create new entry**
1. Paste the YouTube link in **youtubeUrl**.
2. Leave **title** empty. It fills in automatically from YouTube.
3. Pick the **publishedDate** (the day the video was uploaded).
4. Choose a **category** (optional).
5. Click **Save**, then **Publish**.

> Want the video to stay at the top? Turn on **isPinned** and set **pinOrder** (1 = first).

### Change the big video at the top (Hero)
**Content Manager → Home Page → hero → video**
1. Replace the link in **youtubeUrl**.
2. **Clear the title** so the new video's title loads, or type your own title.
3. **Save**, then **Publish**.

### Change "Trending Now" (5 videos on the right)
**Content Manager → Home Page → trendingVideos**
- **Add:** click **Add an entry** and paste a YouTube link (maximum 5).
- **Remove:** click the bin icon.
- **Reorder:** drag the items up or down.
- **Save**, then **Publish**.

### Add a Facebook reel or video
**Content Manager → Facebook Video → Create new entry**
1. Paste the public Facebook reel or video link in **url**.
2. Write a short **title**.
3. Set **order** (1 = first). Up to 6 are shown.
4. **Save**, then **Publish**.

### Add an Instagram reel
**Content Manager → Instagram Post → Create new entry**
1. Paste the Instagram reel link in **url**.
2. Set **order** (1 = first). Up to 6 are shown.
3. **Save**, then **Publish**.

### Add a "BREAKING" headline
**Content Manager → Ticker Item → Create new entry**
1. Write the headline in **text**.
2. Optional: paste a YouTube link in **youtubeUrl** (the headline opens the video), **or** a website link in **link**. Not both.
3. Optional: set **startsAt** / **endsAt** to show it only for a period.
4. **Save**, then **Publish**.

> When there are no headlines, the strip shows the latest video titles automatically.

### Going LIVE
**Content Manager → Live Stream**
1. Paste the live YouTube or Facebook link in **url**.
2. Write a **title**, for example "LIVE: Market price drive in Karwan Bazar".
3. Turn **isLive** on, then click **Save**. A red LIVE box appears on the home page.
4. When the live ends, turn **isLive** off and click **Save**.

### Hide something from the website
Open the entry and click **Unpublish**. It disappears from the website but is not deleted.

---

## 4. Other things you can change

| What on the website | Where in Content Manager |
|---|---|
| Section titles, the tip box, the footer banner text and buttons | **Home Page** |
| Logo, phone, address, social media links | **Site Settings** |
| Top menu and footer links | **Navigation** |
| About us, Privacy policy, Contact pages | **Page** (write the text, then **Publish**) |
| Turn ads on or off | **Ad Settings** |

**Pictures:** upload them in **Media Library** and always fill in the **Alternative text**
(a short description). This helps Google and visually impaired readers.

---

## 5. If something goes wrong

| Problem | What to do |
|---|---|
| A red error appears when saving a link | Check that you pasted the normal link (starting with `https://`), not embed code. |
| "Could not read the title from YouTube" | Type the title yourself, then save. |
| My change is not on the website | Did you click **Publish**? Wait 10 seconds and refresh the page. |
| A video shows an empty box | The video or post is private or deleted. Use a public link. |

Need help? Contact the developer: **Traideas**.
