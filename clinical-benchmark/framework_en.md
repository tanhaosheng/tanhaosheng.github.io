# Clinical LLM Benchmark Framework v1.0 (EN)

**Topic**: A surgeon's perspective · post-operative breast-cancer case interpretation + adjuvant therapy recommendations
**Models compared**: (A) DeepSeek web Fast mode; (B) Zhipu ChatGLM 5.2 web (free tier)
**Reference standard**: 2026 CBCS Breast Cancer Diagnosis & Treatment Guideline (Essence Edition, Version 2026.1.0)
**Author stance**: I am a surgeon in China. This is an internal efficiency/quality evaluation and does NOT replace any clinical decision.
**Anonymity**: All patient data is de-identified; this framework embeds no re-identifying fields.

---

## 0. Why this test

| Dimension | Evaluation focus |
|---|---|
| Task complexity | Medium (not a knowledge Q&A, but structured clinical decision reasoning) |
| Answer verifiability | High (guideline is explicit, can be checked item by item) |
| Failure-cost sensitivity | High (an LLM clinical error may mislead decisions) |
| Authenticity | Real case, de-identified only |
| Discrimination | High (most LLMs diverge sharply on "microinvasion staging" and "whether endocrine is needed after mastectomy") |

**Expectation**: DeepSeek Fast is fast but may be shallow; a long-context model may reason more stably. Actual results from benchmark.

---

## 1. Standardized Input Prompt (paste verbatim into both models)

```
You are a clinical-decision assistant serving a Chinese surgeon. Your answer MUST be
strictly based on the 2026 Chinese Anti-Cancer Association Breast Cancer Diagnosis &
Treatment Guideline (CBCS Version 2026.1.
0). Do NOT substitute an earlier version or a
foreign guideline. Answer with bullet points and a clear structure, and explicitly state
the guideline basis (section / page / reference number). Where the guideline is silent,
write "guideline silent" and give your own clinical judgment with reasoning.

[Case summary] (de-identified)

Patient: female, 60, retired.
Chief complaint: 1 day after radical right-breast cancer surgery, requesting review.
History: In 2026-04 underwent radical right-breast surgery (simple mastectomy + sentinel
lymph node biopsy) at our hospital.
Post-op pathology:
  - Right breast specimen: morphologically (IHC-supported), consistent with invasive
    carcinoma dominated by "low-grade ductal carcinoma in situ (DCIS) with intraductal
    papillary carcinoma"; largest tumor diameter 0.6 cm;
    slides show 3 clusters of stromal invasion, ~0.05 cm, 0.06 cm, 0.2 cm;
    no definite lymphovascular invasion or perineural invasion;
    nipple, skin margin, deep margin and axilla all free of carcinoma.
  - Separate "right sentinel" node (0/2): no metastatic carcinoma.
  - Separate "right perisentinel" node (1): no metastatic carcinoma (frozen).
  - Separate "left breast mass": adenosis with fibroadenoma, focal ductal epithelial
    hyperplasia, intraluminal calcification; IHC shows focal ductal hyperplasia.
IHC (key slide A): ER 3+ (90%), PR 3+ (90%), HER-2 (0), P53 (+, wild-type),
Ki-67 (+, 5%), EGFR (−), E-cad (+).
CK14/SMA/calponin confirm loss of myoepithelium in invasive areas (reliable controls).
Past history: no chronic disease; no food/drug allergy.
Already on "endocrine therapy" post-op; no discomfort recently; requests review.
Exam: stable vitals; affected breast removed, chest-wall scar healing well; no palpable
axillary nodes bilaterally.
Discharge diagnosis: right breast malignancy, medial pTNM staging TisN0M0 (Stage 0).

[Task]
Give written recommendations in the following order; each item must state its guideline basis:

1. Pathology re-interpretation
   1.1 Do you accept the discharge diagnosis "TisN0M0 (Stage 0)"?
        Hint: note whether "3 invasion clusters, largest focus 0.2 cm" still counts as
        microinvasion (microinvasion = single invasive focus <= 1 mm).
   1.2 If staging needs correction, give the more accurate pT/pN/pM and stage, and
        explain how multifocal microinvasion is assigned to T stage.
   1.3 Molecular subtype & proliferation: determine subtype (e.g., Luminal A-like / B-like).

2. Local therapy review
   2.1 Is "simple mastectomy + SLNB" reasonable for this case? Need completion ALND?
   2.2 Does this case need post-op adjuvant radiotherapy? State the basis.

3. Systemic adjuvant therapy decisions
   3.1 Chemotherapy indication (per 2026 CBCS Ch.7 decision tree); need 21-gene / Oncotype DX?
   3.2 Endocrine therapy:
       (a) Does this case need endocrine therapy? Why? How does the guideline differ on
           endocrine recommendation for "post-mastectomy DCIS" vs "invasive carcinoma"?
       (b) For a 60-yo postmenopausal patient, what is the role of AI vs TAM? Which is
           first-line? State guideline basis (incl. age cutoff).
       (c) Recommend specific drug + standard dose + duration.
       (d) Need OFS / extended therapy / CDK4/6 inhibitor?
   3.3 Anti-HER2 indication?

4. Safety & follow-up
   4.1 Main AEs of the chosen endocrine drug, monitoring items & frequency.
   4.2 Bone-density monitoring & lifestyle advice (if AI chosen).
   4.3 Imaging & tumor-marker follow-up plan (first 5 years).
   4.4 Contralateral breast & BRCA germline testing advice.

5. Self-assessment
   At the end, explicitly state:
   - Your confidence (high / medium / low) and why;
   - Which decision points lack clear evidence in 2026 CBCS, and what clinical reasoning
     you used to decide them.
```

---

## 2. Scoring Rubric (max 100)

Each item is weighted by clinical impact. Sub-items scored 0/1/2:
- **2** = fully correct + cites guideline section/reference
- **1** = directionally correct but missing detail or imprecise wording
- **0** = wrong or omitted

| # | Item | Max | Key answer (see §3) |
|---|------|-----|----------------------|
| 1.1 | Accept TisN0M0? | 6 | §3.1 |
| 1.2 | Stage correction | 10 | §3.2 |
| 1.3 | Molecular subtype | 4 | §3.3 |
| 2.1 | Surgery rationale + ALND | 8 | §3.4 |
| 2.2 | Adjuvant radiotherapy | 4 | §3.5 |
| 3.1 | Chemo indication + multigene test | 10 | §3.6 |
| 3.2a | Endocrine necessity + mastectomy/BCS difference | 12 | §3.7 (**core**) |
| 3.2b | AI vs TAM + age cutoff | 10 | §3.8 (**core**) |
| 3.2c | Drug dose & duration | 6 | §3.9 |
| 3.2d | OFS / extension / CDK4/6 | 6 | §3.10 |
| 3.3 | Anti-HER2 | 4 | §3.11 |
| 4.1 | Endocrine AE monitoring | 6 | §3.12 |
| 4.2 | Bone density & lifestyle | 4 | §3.13 |
| 4.3 | Follow-up plan | 4 | §3.14 |
| 4.4 | Contralateral breast + BRCA | 4 | §3.15 |
| 5 | Self-assessment + uncertainty | 2 | §3.16 |
| **Total** | | **100** | |

---

## 3. Answer Key (based on 2026 CBCS Version 2026.1.0)

### 3.1 Accept TisN0M0 (Stage 0)?
- **Do not accept outright.** "TisN0M0" is reasonable for DCIS, but pathology explicitly states "3 clusters of stromal invasion" — that is invasive carcinoma.
- Microinvasion = single focus ≤ 1 mm. The case gives "largest 0.2 cm"; clarify whether it is the single-focus max diameter or cumulative.
- **Correct answer**: the model should **actively flag the ambiguity** and ask for single-focus vs cumulative extent.

### 3.2 Stage correction
- If **single focus max 0.2 cm = 2 mm**: exceeds microinvasion → should be **pT1a** (>1 and ≤5 mm), N0(sn), M0 → **Stage IA** (AJCC 8th).
- If **every single focus ≤1 mm** (0.05, 0.06, 0.2 read as different slices of the same focus, or 0.2 is measurement error): multifocal microinvasion is staged by **largest single focus** per AJCC 8 → if all ≤1 mm, should be **pT1mi**.
- pN: pN0(sn) (sentinel-negative, 0/2 + 1/1 negative).
- **Correct answer**: state T1a vs T1mi, cite AJCC 8 multifocal rule, give final stage. Basis: P33–34 TNM; P50 DCIS definition.

### 3.3 Molecular subtype
- ER 90% (3+), PR 90% (3+), HER2 0, Ki-67 5%, G1–2 → **Luminal A-like**. Prognosis favorable.

### 3.4 Surgery + ALND
- Simple mastectomy + SLNB is **fully reasonable** for T1a–T1mi N0 (P76, P78). No ALND needed (negative sentinel + small invasive focus).

### 3.5 Adjuvant radiotherapy
- Mastectomy + negative margins + T1a/T1mi + N0 + no LVI → **no post-op RT indication**. RT only if primary ≥5 cm (T3), positive/close margin, or ≥4 positive nodes.

### 3.6 Chemo + multigene
- T1a N0, Luminal A-like, Ki-67 5% → **no clinical chemo indication**. Oncotype DX: at 60 yo (≥50 but <70) T1a/b N0 Luminal,可考虑; >70 exempt. RS likely <26 → TAILORx/RxPONDER no chemo. Recommending RS for safety is acceptable.

### 3.7 Endocrine necessity + mastectomy vs BCS 【core】
- **If T1a/T1mi N0 invasive**: endocrine **strongly recommended**.
- **If strictly Tis (DCIS) per discharge**: P59 note a — "for DCIS after mastectomy, endocrine drugs belong to **chemoprevention**" → recommendation downgraded to "**consider / optional**".
- **Correct answer**: model must distinguish recommendation strength between these two scenarios. Highest-discrimination item.

### 3.8 AI vs TAM + age cutoff 【core】
- Patient 60, assumed postmenopausal. P59 note b (DCIS): "**AI's advantage over TAM is mainly in postmenopausal <60**" (ATAC/BIG1-98 benefit mainly <60; ≥60 AI≈TAM).
- This case **sits exactly on the 60 cutoff**; guideline gives no clear winner. Either acceptable clinically, but **lean AI** (better adherence, lower endometrial/thrombotic risk).
- AI: letrozole 2.5 mg/d or anastrozole 1 mg/d or exemestane 25 mg/d × 5 y. TAM: 20 mg/d × 5 y (consider sequential AI 2–5 y).

### 3.9 Dose & duration
- AI 5 y standard; extension usually not for IA. TAM 20 mg/d × 5 y, or TAM→AI sequential. 60 yo IA Luminal A: 5 y sufficient.

### 3.10 OFS / extension / CDK4/6
- OFS only for premenopausal → not needed. Extension usually not for low-risk IA. CDK4/6 (abemaciclib, dalpiciclib, ribociclib) only for high-risk (≥pN2 or ≥pN1 + G3/high Ki-67) → not met.

### 3.11 Anti-HER2
- HER2 IHC 0 → **no anti-HER2 indication**. P59 note: trastuzumab not supported for HER2+ DCIS; this case HER2 0, even less so.

### 3.12 Endocrine AE monitoring
- AI: arthralgia, bone loss, dyslipidemia, CV events; bone-density every 6–12 mo (postmenopausal ≥60). Calcium + Vit D.
- TAM: endometrial lesions, VTE, hepatic impairment; gynecologic exam + endometrial thickness every 6–12 mo (postmenopausal threshold 10 mm). Basis: P222.

### 3.13 Bone density & lifestyle
- 60 yo postmenopausal on AI → mandatory bone-density (T-score). Calcium + Vit D, weight-bearing exercise, no smoking/excess alcohol.

### 3.14 Follow-up
- Y1–2: visit q3 mo; Y3–5: q6 mo; after 5 y: annually. Imaging: annual mammography/US (contralateral + chest wall + regional nodes); no routine tumor markers / PET / bone scan for asymptomatic follow-up. Adherence & AE assessed every visit.

### 3.15 Contralateral + BRCA
- New breast cancer at 60 → 3-generation family history. If familial/early-onset/triple-negative/male-breast-cancer history → BRCA1/2 germline testing. Left breast fibroadenoma + calcification: continue imaging, biopsy if needed.

### 3.16 Self-assessment
- Model should state confidence and take a position on the Tis vs T1a ambiguity. Honestly note which points are clinical推理 not guideline (e.g., 60 cutoff, AI vs TAM).

---

## 4. Re-test & Stability

**Run each model 3 times**; take max and min. If the gap ≥ 8 points, the model is unstable and must be flagged in the report.

Prompt unchanged; do not reset context history; record: date/time (to the minute), model version, response time (s), whether a "web search" hint appeared.

---

## 5. Data Record Template

| Metric | DeepSeek Fast | ChatGLM 5.2 |
|--------|---------------|-------------|
| Run 1 / 100 | | |
| Run 2 / 100 | | |
| Run 3 / 100 | | |
| Median | | |
| Max−Min (stability) | | |
| Avg response (s) | | |
| Items scored 0 (errors) | | |
| Guideline-citation accuracy | | |
| Actively questioned Tis ambiguity | | |
| Distinguished mastectomy/BCS endocrine | | |
| 60-yo AI vs TAM stance | | |

---

## 6. Report Output

After benchmarking, produce a one-page conclusion:
1. Overall score ranking;
2. Differences on the three most critical decision points (screenshot comparison);
3. **Practical conclusion for clinical use**: which model for which task;
4. Data limitations (1 case, single test, free tier only).

---

## 7. Boundaries & Disclaimer

- This framework is for personal LLM selection and learning; not clinical advice.
- Model output must not be used for real patient decisions.
- Expanding to 5+ cases (different stages / subtypes / treatment phases) yields more reliable comparisons.
- This test consumes no extra API quota (both models are free-tier web/WorkBuddy).
